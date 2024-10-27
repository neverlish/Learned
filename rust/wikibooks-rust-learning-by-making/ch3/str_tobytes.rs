fn main() {
  let pr = "구슬이 서 말이라도 꿰어야 보배";
  for c in pr.bytes()  {
    print!("{:2x} ", c);
  }

  println!("\n바이트 = {}B", pr.len());
}