use tokio::net::TcpStream;
use std::error::Error;
use crate::client::req::TcpRequest;

pub async fn handle_client(mut socket: TcpStream) -> Result<(), Box<dyn Error>> {
    let request = TcpRequest::request_client(&mut socket).await?;

    println!(
        "Received request: Version {} | Command {} | Addr Type {} | Destination {}:{}",
        request.version, request.command, request.address_type, request.dest, request.port
    );

    //  trying to connect to the target server
    let mut target_stream = TcpStream::connect(format!("{}:{}", request.dest, request.port)).await?;
    println!("Connected to target server: {}:{}", request.dest, request.port);

    // bi-directional data transfer between client and target
    let (mut client_reader, mut client_writer) = socket.split();
    let (mut server_reader, mut server_writer) = target_stream.split();

    let client_to_server = tokio::io::copy(&mut client_reader, &mut server_writer);
    let server_to_client = tokio::io::copy(&mut server_reader, &mut client_writer);

    tokio::try_join!(client_to_server, server_to_client)?;

    Ok(())
}
