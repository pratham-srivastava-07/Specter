// src/metrics.rs

use std::sync::atomic::{AtomicU64, Ordering};
use lazy_static::lazy_static;

lazy_static! {
    static ref TOTAL_REQUESTS: AtomicU64 = AtomicU64::new(0);
    static ref TOTAL_ERRORS: AtomicU64 = AtomicU64::new(0);
    static ref CACHE_HITS: AtomicU64 = AtomicU64::new(0);
}

pub struct Metrics;

impl Metrics {
    pub fn increment_request() {
        TOTAL_REQUESTS.fetch_add(1, Ordering::SeqCst);
    }

    pub fn increment_error() {
        TOTAL_ERRORS.fetch_add(1, Ordering::SeqCst);
    }

    pub fn increment_cache_hit() {
        CACHE_HITS.fetch_add(1, Ordering::SeqCst);
    }

    
    // pub fn get_stats() -> (u64, u64, u64) {
    //     (
    //         TOTAL_REQUESTS.load(Ordering::SeqCst),
    //         TOTAL_ERRORS.load(Ordering::SeqCst),
    //         CACHE_HITS.load(Ordering::SeqCst),
    //     )
    // }
}
