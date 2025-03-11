pub fn extract_auth_token(headers: &[String]) -> Option<String> {
    for header in headers {
        if header.starts_with("Authorization:") {
            let parts: Vec<&str> = header.split_whitespace().collect();
            if parts.len() == 2 {
                return Some(parts[1].to_string());
            }
        }
    }
    None
}
