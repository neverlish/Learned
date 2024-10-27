fn main() {
  let s = "서로 사랑하면 살고 서로 싸우며 죽는다".to_string();
  echo(s);
  println!("{}", s);
}

fn echo(s: String) {
  println!("{}", s);
}