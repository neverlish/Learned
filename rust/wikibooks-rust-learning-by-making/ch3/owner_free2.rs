fn main() {
  {
    let s1 = String::from("인생에 뜻을 세우는데 있어 늦은 때라곤 없다.");
    let s3 = String::from("계단을 밟아야 계단 위에 올라설수 있다");

    {
      let s2 = s1;
      println!("{}", s2);
    }
    println!("{}", s3);
  }
}