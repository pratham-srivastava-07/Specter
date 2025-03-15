// use std::env;
pub fn extract_auth_token(headers: &[String]) -> Option<String> {
    println!("headers: {:?}", headers);
    for header in headers {
        if header.starts_with("Authorization:") {
            let parts: Vec<&str> = header.split_whitespace().collect();
            println!("Parts: {:?}", parts);
            if parts.len() == 3 && parts[1] == "Bearer" {
                let token = parts[2].to_string();
                if Some(&token) == match_key().as_ref() {
                    println!("Valid Token: {}", token);
                    return Some(token);
                } else {
                    println!("Token mismatch. Expected: {:?}, Got: {}", match_key(), token);
                }
            }
        }
    }
    None
}

pub fn match_key() -> Option<String> {
    
     std::env::var("SECRET_KEY").ok()
}
