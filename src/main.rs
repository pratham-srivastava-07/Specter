use tokio::net::TcpListener;
use std::error::Error;
mod proxy;
mod client;

 
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let listener = TcpListener::bind("0.0.0.0:1080").await?;
    println!("Proxy listening on port 1080...");
    loop {
        
        let (socket,  add) = listener.accept().await?;
        println!("new connection from client {}", add);
         
         tokio::spawn(async move {
            if let Err(e) = proxy::handle_client(socket).await {
                println!("Error handling client: {}", e);
            }
        });
    }
}
