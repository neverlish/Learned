fn int_to_str(value: i64) -> String {
  let s = format!("{}", value);
  s
}

fn main() {
  let s = int_to_str(256);
  println!("{}", s);
}