fn main() {
  let s = "안녕하세요";
  let ch = s.chars().nth(0).unwrap();
  println!("{}", ch);

  let ch = s.chars().nth(2).unwrap();
  println!("{}", ch);
}