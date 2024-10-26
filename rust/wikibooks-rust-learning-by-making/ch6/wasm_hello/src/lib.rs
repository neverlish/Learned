extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn hello(name: &str) {
    let msg = format!("Hello, {}!", name);
    alert(&msg);
} 

#[wasm_bindgen]
pub fn rust_mul(a: i32, b: i32) -> i32 {
    a * b
}