# Specter

<div align="center">

**A lightweight, high-performance forward proxy server built in Rust**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Crates.io](https://img.shields.io/crates/v/rustproxy.svg)](https://crates.io/crates/rustproxy)
[![Rust Version](https://img.shields.io/badge/rust-stable-brightgreen.svg)](https://www.rust-lang.org)
[![Build Status](https://img.shields.io/github/actions/workflow/status/rustproxy/rustproxy/ci.yml?branch=main)](https://github.com/rustproxy/rustproxy/actions)

</div>

## ⚡ Features

- **HTTP & HTTPS Support** - Seamless handling of both HTTP and HTTPS (via CONNECT) traffic
- **High Performance** - Blazing fast throughput with minimal resource footprint
- **Custom Headers** - Easily inject or modify headers for all proxied requests
- **Authentication** - Support for Basic, Bearer, and custom authentication schemes
- **Filtering Rules** - Flexible content and request filtering based on domains, paths, or content
- **TLS Termination** - Optional TLS termination for advanced inspection capabilities
- **Access Control** - IP-based allow/deny lists and rate limiting
- **Detailed Logging** - Comprehensive logging with configurable verbosity levels
- **Metrics Export** - Prometheus-compatible metrics endpoint for monitoring

## 📋 Configuration

RustProxy can be configured via command line arguments, environment variables, or a configuration file.

### Example Configuration File

```toml
[server]
host = "0.0.0.0"
port = 8080
workers = 4
timeout = 30

[tls]
enabled = true
cert_file = "cert.pem"
key_file = "key.pem"

[auth]
type = "basic"
username = "user"
password = "pass"

[headers]
add = [
  { name = "X-Forwarded-By", value = "RustProxy" },
  { name = "X-Proxy-Version", value = "1.0.0" }
]
remove = ["X-Powered-By", "Server"]

[filters]
block_domains = ["blocked-domain.com"]
block_paths = ["/admin", "/internal"]
```

### Access Control

Restrict access based on IP addresses:

```toml
[access]
allow = ["192.168.1.0/24", "10.0.0.5"]
deny = ["172.16.0.0/16"]
rate_limit = 100  # Requests per minute
```

## 📊 Monitoring

Specter exports Prometheus-compatible metrics at `/metrics`:

- `rustproxy_requests_total` - Total number of requests processed
- `rustproxy_errors_total` - Total number of errors encountered
- `rustproxy_request_duration_seconds` - Request duration histogram
- `rustproxy_active_connections` - Current number of active connections

## 🔍 Logging

Control logging verbosity:

```bash
# Set log level with environment variable
RUST_LOG=info rustproxy

# Or with command line argument
rustproxy --log-level debug
```

## 🛠️ Development

### Prerequisites

- Rust 1.60 or later
- Cargo

### Building

```bash
# Debug build
cargo build

# Release build
cargo build --release
```

### Testing

```bash
cargo test
```

## 📄 License

RustProxy is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
