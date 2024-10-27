fn main() {
  let s2 = "abcdefg";

  println!("{}", &s2[0..1]);

  let s = "안녕하세요";
  let ch = &s[..3];
  println!("{}", ch);

  let ch = &s[6..9];
  println!("{}", ch);
}