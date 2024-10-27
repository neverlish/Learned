use std::collections::HashMap;

fn main() {
  let mut map = HashMap::new();
  map.insert("A", 30);
  map.insert("B", 50);

  match map.get("D")  {
    Some(v) => println!("{}", v),
    None => println!("D는 존재하지 않음")
  }
}