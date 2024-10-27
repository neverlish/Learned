
fn main() {
  let a = 'a';
  let b = b'a';
  let c = '\x61';
  println!("{},{:2x},{}", a, b, c);

  let d = '곰';
  let e = '곰' as u32;
  let f = '\u{acf0}';
  println!("{},{:4x},{}", d, e, f);
}