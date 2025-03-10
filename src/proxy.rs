use tokio::net::TcpStream;
use std::error::Error;
// use tokio::io::{AsyncReadExt, AsyncWriteExt};
use crate::client::req::TcpRequest;
use log::{info, warn};
// use reqwest::Request;

pub async fn handle_client(mut socket: TcpStream) -> Result<(), Box<dyn Error>> {
    let request = TcpRequest::request_client(&mut socket).await?;
    let blocked_domains = ["github.com"];

    if blocked_domains.contains(&request.dest.as_str()) {
        warn!("Cannot forward request to {}", request.dest);
        return Ok(());
    }

    info!(
        "Forwarding request to {}:{}",
        request.dest, request.port
    );

    // Connect to the target server
    let mut target_stream = TcpStream::connect(format!("{}:{}", request.dest, request.port)).await?;
    info!("Connected to target server: {}:{}", request.dest, request.port);

    // Start forwarding data
    let (mut client_reader, mut client_writer) = socket.split();
    let (mut server_reader, mut server_writer) = target_stream.split();

    let client_to_server = tokio::io::copy(&mut client_reader, &mut server_writer);
    let server_to_client = tokio::io::copy(&mut server_reader, &mut client_writer);

    tokio::try_join!(client_to_server, server_to_client)?;

    Ok(())
}
