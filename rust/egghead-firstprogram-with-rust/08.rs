// 08 Understanding basic Ownership and Borrowing in Rust

fn main() {
  let first_name = "Pascal".to_string();

  say_first_name(&first_name);
  say_first_name(&first_name);
}

fn say_first_name(first: &String) {
  println!("{}", first);
}