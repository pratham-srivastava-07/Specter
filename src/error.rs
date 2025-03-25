use thiserror::Error;


#[derive(Error, Debug)]
pub enum ProxyError {
    #[error("IO Error {0}")]
    IO(#[from] std::io::Error),

    #[error("Connection error: {0}")]
    Connection(String),

    #[error("Authentication error: {0}")]
    Authentication(String),

    #[error("Environment error: {0}")]
    Environment(String),

}


pub type ProxyResult<T> = Result<T, ProxyError>;

