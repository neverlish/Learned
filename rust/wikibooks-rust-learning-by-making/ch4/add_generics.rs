fn add<T: std::ops::Add<Output=T>>(a: T, b: T) -> T {
  a + b
}

fn main() {
  println!("{}", add(10, 25));
  println!("{}", add(10.0, 25.0));
  println!("{}", add::<i32>(10, 25));
  // println!("{}", add('a', 'a'));
}