fn main() {
  let mut v1: Vec<i32> = Vec::new();
  v1.push(10);
  v1.push(20);
  v1.push(30);
  v1.pop();

  for i in v1.iter() {
    println!("{}", i);
  }

  let mut v2: Vec<char> = Vec::<char>::new();
  v2.push('a');
  v2.push('b');
  v2.push('c');
  v2.pop();

  for i in v2.iter() {
    println!("{}", i);
  }
}