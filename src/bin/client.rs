use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use tokio_native_tls::TlsConnector;
use native_tls::TlsConnector as NativeTlsConnector;
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let proxy_addr = "127.0.0.1:1080"; // Your proxy server address
    let target_host = "example.com";
    let target_port = 443;

    println!("Connecting to proxy at {}", proxy_addr);
    let mut connect_server = TcpStream::connect(proxy_addr).await?;

    // Sending an HTTP CONNECT request to establish a tunnel
    let connect_request = format!(
        "CONNECT {}:{} HTTP/1.1\r\nHost: {}:{}\r\n\r\n",
        target_host, target_port, target_host, target_port
    );

    connect_server.write_all(connect_request.as_bytes()).await?;

    // Read response from proxy
    let mut buffer = [0; 1024];
    let n = connect_server.read(&mut buffer).await?;
    let response = String::from_utf8_lossy(&buffer[..n]);

    if !response.contains("200 Connection Established") {
        eprintln!("Proxy connection failed: {}", response);
        return Err("Failed to establish connection".into());
    }

    println!("Connected to {} through proxy!", target_host);

    // Upgrade to a TLS connection using `native-tls`
    let native_tls_connector = NativeTlsConnector::new()?;
    let connector = TlsConnector::from(native_tls_connector);
    let mut tls_stream = connector.connect(target_host, connect_server).await?;

    // Send the actual HTTP request
    let http_request = format!(
        "GET / HTTP/1.1\r\nHost: {}\r\nUser-Agent: Rust-Client\r\nConnection: close\r\n\r\n",
        target_host
    );
    tls_stream.write_all(http_request.as_bytes()).await?;

    // Read and print the response
    let mut response = String::new();
    tls_stream.read_to_string(&mut response).await?;
    println!("Response:\n{}", response);

    Ok(())
}
