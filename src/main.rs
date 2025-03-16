use tokio::net::TcpListener;
use std::error::Error;
mod proxy;
mod client;
use log::{info, error};
mod auth;
mod cache;
use dotenv::dotenv;
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();
    env_logger::init();
    let listener = TcpListener::bind("0.0.0.0:1080").await?;
    info!("Proxy listening on port 1080...");
    loop {
        
        let (socket,  add) = listener.accept().await?;
        info!("new connection from client {}", add);
         
         tokio::spawn(async move {
            if let Err(e) = proxy::handle_client(socket).await {
                error!("Error handling client: {}", e);
            }
        });
    }
}
