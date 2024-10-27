fn main() {
  let mut s = String::from("벼는 익을수록 고개를 숙인다");
  {
    let ref1 = &mut s;
    println!("ref1={}", ref1);
  }
  {
    let ref2 = &mut s;
    println!("ref2={}", ref2);

  }
  
  
}