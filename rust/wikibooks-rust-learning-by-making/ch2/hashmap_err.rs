use std::collections::HashMap;

fn main() {
  let mut map = HashMap::new();
  map.insert("A", 30);
  map.insert("B", 50);

  let d = map["D"];
  println!("{}", d);
}