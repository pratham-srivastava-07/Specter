use tokio::net::TcpStream;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::error::Error;
use crate::client::req::TcpRequest;
use log::{info, warn, error};
use crate::auth;
use std::collections::HashSet;
use crate::cache::Cache;
use std::time::Duration;

lazy_static::lazy_static! {
    static ref CACHE: Cache = Cache::new(); // global cache
}

pub async fn handle_client(mut socket: TcpStream) -> Result<(), Box<dyn Error>> {
    let request = TcpRequest::request_client(&mut socket).await?;
    let blocked_domains: HashSet<&str> = vec!["github.com"].into_iter().collect();
    let key = format!("{}:{}", request.dest, request.port);
    let ttl = Duration::from_secs(30);

    // Check for blocked domains
    if blocked_domains.contains(&request.dest.as_str()) {
        warn!("Cannot forward request to {}", request.dest);
        return Ok(());
    }

    // Check for authentication token
    let token = auth::extract_auth_token(&request.headers);
    if token.is_none() {
        error!("No valid authorization token found");
        return Err("Unauthorized request".into());
    }

    if let Some(token) = token {
        info!("Authorization Token {}", token);
    } else {
        error!("No Authorization token found");
        return Err("Could not forward request due to missing token".into());
    }

    // Check if response is cached before, if yes take from cache
    if let Some(cached_response) = CACHE.retrieve_data(&key, ttl).await {
        info!("Getting data from cache");
        socket.write_all(&cached_response).await?;
        return Ok(());
    }

    info!(
        "Forwarding request to {}:{}",
        request.dest, request.port
    );

    // Connect to the target server
    let mut target_stream = TcpStream::connect(format!("{}:{}", request.dest, request.port)).await?;
    info!("Connected to target server: {}:{}", request.dest, request.port);

    if request.port == 443 {
        // For HTTPS, tunnel the raw data using copy_bidirectional
        info!("Handling HTTPS traffic");
        tokio::io::copy_bidirectional(&mut socket, &mut target_stream).await?;
    } else {
        // For HTTP, capture and cache data
        info!("Handling HTTP traffic");
        let mut response_buffer = Vec::new();
        let mut temp_buffer = [0; 1024];

        loop {
            let n = target_stream.read(&mut temp_buffer).await?;
            if n == 0 {
                break;
            }

            // Write data back to the client
            socket.write_all(&temp_buffer[..n]).await?;
            tokio::io::copy_bidirectional(&mut socket, &mut target_stream).await?;

            // Store data into the buffer for caching
            response_buffer.extend_from_slice(&temp_buffer[..n]);
        }

        // After receiving data, store it in the cache
        info!("🗄️ Storing response in cache...");
        CACHE.store_keys(key, response_buffer).await;
    }

    // Clean up expired cache entries
    CACHE.remove_data(ttl).await;

    Ok(())
}
