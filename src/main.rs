use tokio::net::TcpListener;
mod proxy;
mod client;
use log::{info, error};
mod auth;
mod cache;
mod error;
use dotenv::dotenv;
mod metrics;

use error::{ProxyError, ProxyResult};
#[tokio::main]
async fn main() -> ProxyResult<()> {
    dotenv().ok();
    

     // Initialize logger
     if let Err(e) = env_logger::try_init() {
        return Err(ProxyError::Environment(format!("Failed to initialize logger: {}", e)));
    }

    let listener = TcpListener::bind("0.0.0.0:1080").await.map_err(|e| ProxyError::Connection(format!("Failed to bind to address: {}", e)))?;
    info!("Proxy listening on port 1080...");

    loop {
        match listener.accept().await {
            Ok((socket, addr)) => {
                info!("New connection from client {}", addr);
                
                tokio::spawn(async move {
                    if let Err(e) = proxy::handle_client(socket).await {
                        error!("Error handling client: {}", e);
                    }
                });
            }
            Err(e) => {
                error!("Failed to accept connection: {}", e);
                continue;
            }
        }
    }
}
