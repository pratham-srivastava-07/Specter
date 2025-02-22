use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use std::error::Error;

pub async fn handle_client(mut socket: TcpStream) -> Result<(), Box<dyn Error>> { // function returns a result type, ()-> ok() and Box<dyn Error>> returns a boxed dynamic error
    let mut buffer = [0; 1024]; // initializing an array of 1024 el with 0

    // handling proxy handshake 
    let n = socket.read(&mut buffer).await?;

    // check if there are atlesst 2 bytes received
    if n < 2 {
        println!("Invalid SOCKS5 handshake");
        return Err("Handshake failed".into())
    }
    // version and nmethods checking
    let version = buffer[0];
    let nmethods = buffer[1];

    if version != 5 {
        println!("Version does not match, {}", version);
        return Err("Unsupported SOCKS version".into());
    }

    let methods = &buffer[2..( 2 + nmethods as usize)];
    println!("Methods supported {:?}", methods);
    // if it contains 0x00 proceed with writing, else dont
    if  methods.contains(&0x00) {
        socket.write_all(&[5, 0]).await?;
        println!("No Authentication supported, sending response...");
    } else {
        println!("No acceptable authentication methods");
        socket.write_all(&[5, 0xFF]).await?;
        return Err("Authentication method not supported".into());
    }
    Ok(())
}