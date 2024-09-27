fn main() {
  for i in 1..101 {
    if i % 3 == 0 && i % 5 == 0 {
      println!("FizBuzz");
    } else if i % 3 == 0 {
      println!("Fizz");
    } else if i % 5 == 0 {
      println!("Buzz");
    } else {
      println!("{}", i);
    }
  }
}