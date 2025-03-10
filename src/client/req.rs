use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::net::TcpStream;
use std::error::Error;
use log::info;
pub struct TcpRequest {
    pub dest: String,
    pub port: u16,
}

impl TcpRequest {
    pub async fn request_client(socket: &mut TcpStream) -> Result<Self, Box<dyn Error>> {
        let mut reader = BufReader::new(socket);
        let mut request_line = String::new();

        // Read the first line of the HTTP request
        reader.read_line(&mut request_line).await?;
        info!("Received Request: {}", request_line);

        // Parse HTTP CONNECT request (e.g., "CONNECT example.com:443 HTTP/1.1")
        if !request_line.starts_with("CONNECT") {
            return Err("Only HTTP CONNECT requests are supported".into());
        }

        let parts: Vec<&str> = request_line.split_whitespace().collect();
        if parts.len() < 3 {
            return Err("Invalid HTTP CONNECT request".into());
        }

        // Extract destination and port
        let host_port: Vec<&str> = parts[1].split(':').collect();
        if host_port.len() != 2 {
            return Err("Invalid destination format".into());
        }

        let dest = host_port[0].to_string();
        let port = host_port[1].parse::<u16>()?;

        // Send HTTP 200 Connection Established response
        // socket.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n").await?;

        let socket = reader.get_mut(); 
        socket.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n").await?;

        Ok(TcpRequest { dest, port })
    }
}
