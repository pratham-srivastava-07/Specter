// use std::env;

pub fn extract_auth_token(headers: &[String]) -> Option<String> {
    println!("headers: {:?}", headers);
    for header in headers {
        if header.starts_with("Authorization:") {
            let parts: Vec<&str> = header.split_whitespace().collect();
            println!("Parts: {:?}", parts);
            if parts.len() == 2 {
                println!("here");
                let token = parts[1].to_string();
                if Some(&token) == match_key().as_ref() {
                    println!("{}", token);
                    return Some(token);
                }
            }
        }
    }
    None
}

pub fn match_key() -> Option<String> {
    
     std::env::var("SECRET_KEY").ok()
}
