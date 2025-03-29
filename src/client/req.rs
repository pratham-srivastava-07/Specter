use tokio::io::{AsyncBufReadExt, AsyncReadExt, AsyncWriteExt, BufReader};
use tokio::net::TcpStream;
use std::error::Error;
use log::info;

pub struct TcpRequest {
    pub dest: String,
    pub port: u16,
    pub headers: Vec<String>,
    pub method: String,
    pub path: String,
    pub body: Option<String>,
}

impl TcpRequest {
    pub async fn request_client(socket: &mut TcpStream) -> Result<Self, Box<dyn Error>> {
        let mut reader = BufReader::new(socket);
        let mut request_line = String::new();

        // Read the first line of the HTTP request
        reader.read_line(&mut request_line).await?;
        info!("Received Request: {}", request_line);

        let parts: Vec<&str> = request_line.split_whitespace().collect();
        if parts.len() < 3 {
            return Err("Invalid HTTP request".into());
        }

        let method = parts[0].to_string();
        let mut dest = String::new();
        let mut port = 80u16; // Default HTTP port
        let path;

        if method == "CONNECT" {
            // Extract destination and port for CONNECT method
            let host_port: Vec<&str> = parts[1].split(':').collect();
            if host_port.len() != 2 {
                return Err("Invalid destination format".into());
            }

            dest = host_port[0].to_string();
            port = host_port[1].parse::<u16>()?;
            path = String::new(); // CONNECT doesn't need a path

            let mut headers: Vec<String> = Vec::new();

            loop {
                let mut line = String::new();
                reader.read_line(&mut line).await?;

                let line = line.trim();

                if line.is_empty() {
                    break;
                }

                headers.push(line.to_string());
            }

            // For CONNECT method, send the Connection Established response
            let socket = reader.get_mut();
            socket.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n").await?;

            return Ok(TcpRequest {
                dest,
                port,
                headers,
                method,
                path,
                body: None,
            });
        } else {
            // For GET, POST, etc.
            path = parts[1].to_string();
        }

        let mut headers: Vec<String> = Vec::new();
        let mut body = None;

        // Read headers
        loop {
            let mut line = String::new();
            reader.read_line(&mut line).await?;

            let line = line.trim();

            if line.is_empty() {
                break;
            }

            headers.push(line.to_string());

            // Extract host and port from Host header
            if line.to_lowercase().starts_with("host:") {
                let host_parts: Vec<&str> = line[5..].trim().split(':').collect();
                dest = host_parts[0].to_string();

                if host_parts.len() > 1 {
                    port = host_parts[1].parse::<u16>()?;
                }
            }
        }

        // Read request body if Content-Length is present
        for header in &headers {
            if header.to_lowercase().starts_with("content-length:") {
                let content_length: usize = header[15..].trim().parse()?;
                if content_length > 0 {
                    let mut body_buffer = vec![0u8; content_length];
                    reader.read_exact(&mut body_buffer).await?;
                    body = Some(String::from_utf8_lossy(&body_buffer).to_string());
                }
                break;
            }
        }

        Ok(TcpRequest {
            dest,
            port,
            headers,
            method,
            path,
            body,
        })
    }
}
