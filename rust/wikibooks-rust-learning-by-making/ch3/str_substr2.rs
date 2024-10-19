fn main() {
  let pr = "지혜는 무기보다 가치가 있다.";

  let sub3: String = pr.chars().take(2).collect();

  println!("앞 2글자: {}", sub3);

  let pr_chars: Vec<char> = pr.chars().collect();

  let sub_chars = &pr_chars[4..=5];

  let sub4: String = sub_chars.into_iter().collect();
  println!("4-5번째 글자: {}", sub4);
}