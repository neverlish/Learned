fn main() {
  let s = String::from("beep");
  let ss = &s[0..3];

  println!("{}", ss);
}