use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use std::error::Error;
use std::net::Ipv4Addr;

struct TcpRequest  {
    version: u8,
    command: u8,
    addr_type: u8,
    destination: String,
    port: u16,
}

impl TcpRequest {
    pub async fn request_client(socket: &mut TcpStream) -> Result<Self, Box<dyn Error>> {
        let mut  buffer = [0; 4];

        socket.read_exact(&mut buffer).await?;

        let version = buffer[0];
        let command = buffer[1];
        let reserved = buffer[2];
        let address_type = buffer[3];

        if version != 5 {
            return Err("Invalid SOCKS5 version".into());
        }

        if command != 1 {
            return Err("Only CONNECT command is supported".into());
        }

        let dest = match address_type {
            1 => {  // for Ipv4 address checking
                let mut ipv4_buffer = [0;4];
                socket.read_exact(&mut ipv4_buffer).await?;
                Ipv4Addr::from(ipv4_buffer).to_string();
            }
            2 => {
                let mut buffer_length = [0; 1];
                socket.read_exact(&mut buffer_length).await?;
                
            }
            _ => return Err("Unknown address type".into()),
        };
    }
}