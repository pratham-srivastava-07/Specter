use tokio::io::{ AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use std::error::Error;


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let proxy_addr = "127.0.0.1:1080"; // Your proxy server address
    let target_host = "example.com";
    let target_port = 443;

    println!("Connecting to proxy at {}", proxy_addr);
    let mut connect_server = TcpStream::connect(proxy_addr).await?;
     // sending a HTTP req
    let connect_request = format!("CONNECT {}:{} HTTP/1.1\r\nHost: {}:{}\r\n\r\n",
    target_host, target_port, target_host, target_port);

    connect_server.write_all(connect_request.as_bytes()).await?;

    // read response from proxy

    let mut buffer = [0; 1024];

    let n = connect_server.read(&mut buffer).await?;
    let response = String::from_utf8_lossy(&buffer[..n]);

    if !response.contains("200 Connection Established") {
        eprintln!("Proxy connection failed: {}", response);
        return Err("Failed to establish connection".into());
    }

    println!("Connected to {} through proxy!", target_host);

    Ok(())

}