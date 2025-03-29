use tokio::net::TcpStream;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::error::Error;
use crate::client::req::TcpRequest;
use log::{info, warn, error};
use crate::auth;
use std::collections::HashSet;
use crate::cache::Cache;
use std::time::Duration;
use crate::metrics::Metrics;

lazy_static::lazy_static! {
    static ref CACHE: Cache = Cache::new(); // global cache
}

pub async fn handle_client(mut socket: TcpStream) -> Result<(), Box<dyn Error>> {
    Metrics::increment_request();
    info!("New request received from client.");

    let request = TcpRequest::request_client(&mut socket).await?;
    let blocked_domains: HashSet<&str> = vec!["github.com"].into_iter().collect();
    let key = format!("{}:{}", request.dest, request.port);
    let ttl = Duration::from_secs(30);

    // Check for blocked domains
    if blocked_domains.contains(&request.dest.as_str()) {
        warn!("Request blocked for domain: {}", request.dest);
        Metrics::increment_error();
        return Ok(());
    }

    // Check for authentication token
    let token = auth::extract_auth_token(&request.headers);
    if token.is_err() {
        error!("Unauthorized request - No valid auth token.");
        Metrics::increment_error();
        return Err("Unauthorized request".into());
    }

    // Check if response is cached before, if yes, retrieve from cache
    if let Some(cached_response) = CACHE.retrieve_data(&key, ttl).await {
        info!("Returning cached response for {}", request.dest);
        Metrics::increment_cache_hit();
        socket.write_all(&cached_response).await?;
        return Ok(());
    }

    // Connect to target server
    let mut target_stream = match TcpStream::connect(format!("{}:{}", request.dest, request.port)).await {
        Ok(stream) => {
            info!("Connected to target server: {}:{}", request.dest, request.port);
            stream
        },
        Err(e) => {
            error!("Failed to connect to {}:{} - {}", request.dest, request.port, e);
            Metrics::increment_error();
            return Err("Could not connect to target server".into());
        }
    };

    // IP masking: Modify request headers to remove client IP traces
    // Create modified headers that will mask the original client IP
    let mut modified_headers: Vec<String> = request.headers.clone();
    modified_headers.retain(|header| !header.to_lowercase().starts_with("x-forwarded-for"));
    modified_headers.retain(|header| !header.to_lowercase().starts_with("x-real-ip"));
    modified_headers.push("X-Forwarded-For: 127.0.0.1".to_string()); // Fake IP - you can use your server's IP here
    modified_headers.push("Via: Masked-Proxy".to_string());
    modified_headers.push("X-Real-IP: 127.0.0.1".to_string()); // Another commonly checked header

    info!("Forwarding request to {}:{} with masked IP", request.dest, request.port);

    if request.port == 443 {
        // HTTPS tunneling - we can't modify headers in encrypted traffic
        // Just established the tunnel and let the client communicate directly
        info!("Handling HTTPS traffic");
        
        // For HTTPS, we already sent "HTTP/1.1 200 Connection Established" in the request_client method
        // Now we just need to forward traffic bidirectionally
        tokio::io::copy_bidirectional(&mut socket, &mut target_stream).await?;
    } else {
        // HTTP traffic - we can modify headers
        info!("Handling HTTP traffic");
        
        // Reconstruct and forward the HTTP request with modified headers if this is HTTP
        if !request.method.is_empty() {  // Make sure we have a method (you'll need to add this field to TcpRequest)
            // Reconstruct the HTTP request with modified headers
            let mut http_request = format!("{} {} HTTP/1.1\r\n", request.method, request.path);
            for header in &modified_headers {
                http_request.push_str(&format!("{}\r\n", header));
            }
            http_request.push_str("\r\n");
            
            // If we have a request body, append it (you'll need to capture this in TcpRequest)
            if let Some(body) = &request.body {
                http_request.push_str(body);
            }
            
            // Send the modified request to the target server
            target_stream.write_all(http_request.as_bytes()).await?;
        }
        
        // Handle the response
        let mut response_buffer = Vec::new();
        let mut temp_buffer = [0; 1024];

        loop {
            let n = target_stream.read(&mut temp_buffer).await?;
            if n == 0 {
                break;
            }

            // Forward response to client
            socket.write_all(&temp_buffer[..n]).await?;
            response_buffer.extend_from_slice(&temp_buffer[..n]);
        }

        // Cache the response
        info!("Caching response for {}", request.dest);
        CACHE.store_keys(key, response_buffer).await;
    }

    // Cleanup expired cache entries
    CACHE.remove_data(ttl).await;
    info!("Request handling completed successfully.");

    Ok(())
}
