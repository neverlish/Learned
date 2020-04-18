// 12 Handle errors in Rust using Pattern Matching

use std::io;

fn main() {
  println!("Please enter a first number: ");

  let mut first = String::new();
  io::stdin().read_line(&mut first);

  let mut a:u32 = 0;

  match first.trim().parse() {
    Ok(val) => {
      a = val;
    },
    Err(_err) => {
      println!("This is not a valid number");
    }
  }

  println!("Please enter a second number: ");

  let mut second = String::new();
  io::stdin().read_line(&mut second);

  let mut b:u32 = 0;

  match second.trim().parse() {
    Ok(val) => {
      b = val;
    },
    Err(_err) => {
      println!("This is not a valid number");
    }
  }

  let result = sum(a, b);
  println!("{} + {} = {}", a, b, result);
}

fn sum(a: u32, b: u32) -> u32 {
  a + b
}