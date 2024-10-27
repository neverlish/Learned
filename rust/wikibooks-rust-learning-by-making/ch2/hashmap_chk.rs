use std::collections::HashMap;

fn main() {
  let mut map = HashMap::new();
  map.insert("A", 30);
  map.insert("B", 50);

  if map.get("D") == None {
    println!("D는 존재하지 않음");
  } else {
    println!("{}", map["D"]);
  }
}