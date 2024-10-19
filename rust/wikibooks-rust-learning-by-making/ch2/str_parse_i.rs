fn main() {
  let s = "365";

  let i: i32 = match s.parse() {
    Ok(n) => n,
    Err(_) => 0,
  };

  println!("{}", i);
}