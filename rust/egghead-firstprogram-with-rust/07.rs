// 07 Write and call a function in Rust

fn main() {
  let first = "Pascal".to_string();
  let last = "Precht".to_string();

  say_name(first, last);
}

fn say_name(first: String, last: String) {
  println!("{} {}", first, last);
}