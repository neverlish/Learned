// 14 Create a loop in Rust

use std::io;
use std::process;

fn main() {
  loop {
    println!("Please enter a first number: ");

    let mut first = String::new();
    io::stdin().read_line(&mut first);

    let a:u32;

    match first.trim().parse() {
      Ok(val) => {
        a = val;
      },
      Err(_err) => {
        println!("This is not a valid number");
        process::exit(1);
      }
    }

    println!("Please enter a second number: ");

    let mut second = String::new();
    io::stdin().read_line(&mut second);

    let b:u32;

    match second.trim().parse() {
      Ok(val) => {
        b = val;
      },
      Err(_err) => {
        println!("This is not a valid number");
        process::exit(1);
      }
    }

    let result = sum(a, b);
    println!("{} + {} = {}", a, b, result);
  }
}

fn sum(a: u32, b: u32) -> u32 {
  a + b
}