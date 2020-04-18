// 10 Handle errors with unwrap() in Rust

use std::io;

fn main() {
  println!("Please enter a first number: ");

  let mut first = String::new();
  io::stdin().read_line(&mut first);

  let a:u32 = first.trim().parse().unwrap();

  println!("Please enter a second number: ");

  let mut second = String::new();
  io::stdin().read_line(&mut second);

  let b:u32 = second.trim().parse().unwrap();

  let result = sum(a, b);
  println!("{} + {} = {}", a, b, result);
}

fn sum(a: u32, b: u32) -> u32 {
  a + b
}