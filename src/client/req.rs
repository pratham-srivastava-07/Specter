use tokio::io::AsyncReadExt;
use tokio::net::TcpStream;
use std::error::Error;
use std::net::Ipv4Addr;
use std::net::Ipv6Addr;


pub struct TcpRequest  {
    version: u8,
    command: u8,
    address_type: u8,
    dest: String,
    port: u16,
}

impl TcpRequest {
    pub async fn request_client(socket: &mut TcpStream) -> Result<Self, Box<dyn Error>> {
        let mut  buffer = [0; 4];

        socket.read_exact(&mut buffer).await?;

        let version = buffer[0];
        let command = buffer[1];
        // let reserved = buffer[2];
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
                Ipv4Addr::from(ipv4_buffer).to_string()
            }
            2 => { // Domain
                let mut buffer_length = [0; 1];
                socket.read_exact(&mut buffer_length).await?;
                let mut domain_buffer = vec![0; buffer_length[0] as usize];
                socket.read_exact(&mut domain_buffer).await?;
                String::from_utf8(domain_buffer)?
            }
            3 => {
                let mut ipv6_buffer = [0; 16];
                socket.read_exact(&mut ipv6_buffer).await?;
                Ipv6Addr::from(ipv6_buffer).to_string()
            }
            _ => return Err("Unknown address type".into()),
        };
        let mut port_buf = [0; 2];
        socket.read_exact(&mut port_buf).await?;
        let port = u16::from_be_bytes(port_buf);

        Ok(TcpRequest {
            version,
            command,
            address_type,
            dest,
            port,
        })
    }
}
