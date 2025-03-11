pub fn extract_authToken(headers: &[String]) -> Option<String> {
    for header in &headers {
        if header.starts_with("Authorizaton:") {
            let parts = header.split_whitespace().collect();
            
        }
    }
}