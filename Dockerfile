
    FROM rust:1.74-slim as builder

    
    WORKDIR /app
    
    
    RUN apt-get update && apt-get install -y pkg-config libssl-dev
    
   
    COPY Cargo.toml Cargo.lock ./
    RUN mkdir src && echo "fn main() {}" > src/main.rs
    RUN cargo build --release || true
    
   
    COPY . .
    
    # Final build
    RUN cargo build --release
    
    FROM debian:bullseye-slim
    
    RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
    
    WORKDIR /app
    
   
    COPY --from=builder /app/target/release/rust .
    
    
    EXPOSE 1080
    
  
    CMD ["./rust"]
    