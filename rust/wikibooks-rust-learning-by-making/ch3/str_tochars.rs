fn main() {
  let pr = "구슬이 서 말이라도 꿰어야 보배";

  for c in pr.chars() {
    print!("[{}]", c);
  }

  println!("\n글자 수 = {}자", pr.chars().count());

  let pr_chars: Vec<char> = pr.chars().collect();

  println!("Vec<char> : {:?}", pr_chars);

  for c in pr_chars.iter() {
    print!("({})", c);
  }

  println!("\n글자 수 = {}자", pr_chars.len());
}