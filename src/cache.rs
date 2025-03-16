use std::{collections::HashMap, time::Duration};
use tokio::sync::Mutex;
use std::time::Instant;

#[derive(Clone)]
pub struct CachedResponse {
    pub body: Vec<u8>,
    pub time_stamp: Instant
}

pub struct Cache {
    map: Mutex<HashMap<String, CachedResponse>>
}

impl Cache {
    pub fn new() -> Self {
        Cache {
            map: Mutex::new(HashMap::new())
        }
    }
    // store responses in cache 
    pub async fn store_keys(&self, keys: String, body: Vec<u8>) {
        let mut map = self.map.lock().await;
    
        map.insert(
            keys,
            CachedResponse {
                body,
                time_stamp: Instant::now()
            }
        );
    }
    // retrive from cache, if time not expired
    pub async fn retrieve_data(&self, keys: &str, time: Duration) -> Option<Vec<u8>> {
        let  map = self.map.lock().await;

        // find data

        if let Some(entry) = map.get(keys) {
            if entry.time_stamp.elapsed() < time {
                return Some(entry.body.clone());
            }
        } 
        None
    }

    // remove data from cache, after  time exceeds
    pub async fn remove_data(&self, time: Duration) {
        let mut map = self.map.lock().await;
        map.retain(|_, v| v.time_stamp.elapsed() < time);
    }

}

