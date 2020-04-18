// 09 Read user input from stdin in Rust

use std::io;

fn main() {
  println!("Please enter your name: ");

  let mut name = String::new();

  io::stdin().read_line(&mut name);
  println!("Hello {}", name);
}