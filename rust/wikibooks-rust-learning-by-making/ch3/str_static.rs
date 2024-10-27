fn echo(s: &'static str) {
  println!("{}", s);
}

fn main() {
  echo("웅변은 은이요");
  echo("시간은 금이다");

  // let s = String::from("테스트");
  // echo(&s);
}