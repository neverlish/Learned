fn main() {
  let g1 = String::from("실수할 줄 아는 사람이 아름답다.");
  show_message(g1);
  println!("{}", g1);
}

fn show_message(message: String) {
  println!("{}", message);
}