fn gen_message() -> String {
  let msg = String::from("실수할 줄 아는 사람이 아름답다.");
  return msg;
}

fn main()  {
  let m = gen_message();
  println!("{}", m);
}