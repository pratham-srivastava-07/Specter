use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::error::Error;


// setting up a listener for clients 
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let listener = TcpListener::bind("0.0.0.0:1080").await?;
    println!("SOCKS5 Proxy listening on port 1080...");
    loop {
        // accepting an incoming client request
        let (mut socket,  add) = listener.accept().await?;
        println!("new connection from client {}", add);
         // Read some data (Just for testing)
         let mut buffer = [0; 1024];
         let n = socket.read(&mut buffer).await?;
         println!("Received {} bytes: {:?}", n, &buffer[..n]);
 
         // Echo the data back (Temporary, we will replace this with real proxy logic)
         socket.write_all(&buffer[..n]).await?;
    }
}

