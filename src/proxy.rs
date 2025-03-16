use tokio:: net::TcpStream;
use tokio::io::AsyncWriteExt;
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
    let blocked_domains: HashSet<&str> = vec!["github.com"].into_iter().collect(); // hash set for storing blocked domaons
    let key = format!("{}:{}", request.dest, request.port); // key for caching 
    let ttl = Duration::from_secs(30); // Cache for 30 seconds


    // chk for blocked domains 
    if blocked_domains.contains(&request.dest.as_str()) {
        warn!("Cannot forward request to {}", request.dest);
        return Ok(());
    }
    // chk for authentication token
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

    // chk if response is  cached before, if yes take from cache, if no store the data 
    if let Some(cached_response)  = CACHE.retrieve_data(&key, ttl).await {
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

    tokio::io::copy_bidirectional(&mut socket, &mut target_stream).await?; // pipes raw bites without interpretting them

    // after receiving data store 
    // CACHE.store_keys(key, target_stream);

    CACHE.remove_data(ttl).await;
    Ok(())
}
