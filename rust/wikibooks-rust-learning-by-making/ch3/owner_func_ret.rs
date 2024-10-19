fn main() {
  let mut g1 = String::from("실수할 줄 아는 사람이 아름답다.");
  g1 = show_message(g1);
  println!("{}", g1);
}

fn show_message(message: String) -> String {
  println!("{}", message);
  return message;
}