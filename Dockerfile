# Stage 1: Build
FROM rust:1.75-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y pkg-config libssl-dev

# Cache dependencies
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Copy source and build actual project
COPY . .
RUN cargo build --release

# Stage 2: Runtime
FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/target/release/rust .

EXPOSE 1080
CMD ["./rust"]
