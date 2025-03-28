use tokio::io::{AsyncBufReadExt, AsyncReadExt, AsyncWriteExt, BufReader};
use tokio::net::TcpStream;
use std::error::Error;
use log::info;

pub struct TcpRequest {
    pub method: String,
    pub dest: String,
    pub port: u16,
    pub headers: Vec<String>,
    pub body: Vec<u8>,
}

impl TcpRequest {
    pub async fn request_client(socket: &mut TcpStream) -> Result<Self, Box<dyn Error>> {
        let mut reader = BufReader::new(socket);
        let mut request_line = String::new();

        // Read the first line (Method, URL, HTTP Version)
        reader.read_line(&mut request_line).await?;
        info!("Received Request: {}", request_line);

        let parts: Vec<&str> = request_line.split_whitespace().collect();
        if parts.len() < 3 {
            return Err("Invalid HTTP request format".into());
        }

        let method = parts[0].to_string();
        let url = parts[1].to_string();
        let _http_version = parts[2].to_string();

        // Handle HTTPS CONNECT Requests
        if method == "CONNECT" {
            let host_port: Vec<&str> = url.split(':').collect();
            if host_port.len() != 2 {
                return Err("Invalid destination format".into());
            }

            let dest = host_port[0].to_string();
            let port = host_port[1].parse::<u16>()?;

            let mut headers = Vec::new();
            loop {
                let mut line = String::new();
                reader.read_line(&mut line).await?;
                let trimmed = line.trim();
                if trimmed.is_empty() {
                    break;
                }
                headers.push(trimmed.to_string());
            }

            // sending HTTP 200 for CONNECT requests
            let socket = reader.get_mut();
            socket.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n").await?;

            return Ok(TcpRequest {
                method,
                dest,
                port,
                headers,
                body: Vec::new(),
            });
        }

        //  HTTP Requests 
        let mut headers = Vec::new();
        let mut content_length = 0;

        loop {
            let mut line = String::new();
            reader.read_line(&mut line).await?;
            let trimmed = line.trim();

            if trimmed.is_empty() {
                break;
            }
            // checking the url and its content
            if trimmed.starts_with("Host:") {
                let parts: Vec<&str> = trimmed.split_whitespace().collect();
                if parts.len() == 2 {
                    let host = parts[1];
                    if host.contains(":") {
                        let host_parts: Vec<&str> = host.split(':').collect();
                        return Ok(TcpRequest {
                            method,
                            dest: host_parts[0].to_string(),
                            port: host_parts[1].parse::<u16>()?,
                            headers,
                            body: Vec::new(),
                        });
                    } else {
                        return Ok(TcpRequest {
                            method,
                            dest: host.to_string(),
                            port: 80,
                            headers,
                            body: Vec::new(),
                        });
                    }
                }
            }

            if trimmed.starts_with("Content-Length:") {
                let parts: Vec<&str> = trimmed.split_whitespace().collect();
                if parts.len() == 2 {
                    content_length = parts[1].parse().unwrap_or(0);
                }
            }

            headers.push(trimmed.to_string());
        }

        // Read the body if there's content
        let mut body = Vec::new();
        if content_length > 0 {
            body.resize(content_length, 0);
            reader.read_exact(&mut body).await?;
        }

        info!("Parsed Request - Method: {}, Destination: {}, Port: {}", method, url, 80);

        Ok(TcpRequest {
            method,
            dest: url,
            port: 80, // Default HTTP port
            headers,
            body,
        })
    }
}
