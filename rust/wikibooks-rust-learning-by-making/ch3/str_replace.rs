fn main() {
  let s = "내 자신에 대한 자신감을 잃으면 온 세상이 나의 적이 된다.";

  let s2 = s.replace("잃으면", "가지면");
  let s3 = s2.replace("적이", "편이");

  println!("수정 전 : {}\n수정 후 : {}", s, s3);
}