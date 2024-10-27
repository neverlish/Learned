fn main() {
  let mut v = 10;

  set_value(&mut v);

  println!("v={}", v);
}

fn set_value(arg: &mut u32) {
  *arg = 100;
}