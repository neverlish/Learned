fn main() {
  let telno = "955-3658";

  println!("-- 슬라이스 --");
  println!("국번: {}", &telno[..3]);
  println!("사번: {}", &telno[4..]);

  println!("--- split at ---");
  let (telno1, telno2) = telno.split_at(3);
  let (telno2, telno3) = telno2.split_at(1);

  println!("국번: {}", telno1);
  println!("구분: {}", telno2);
  println!("사번: {}", telno3);

  println!("-- split off --");
  let mut telno1 = String::from(telno);
  let mut telno2 = telno1.split_off(3);
  let telno3 = telno2.split_off(1);

  println!("국번: {}", telno1);
  println!("구분: {}", telno2);
  println!("사번: {}", telno3);

  println!("-- split --");
  let telno_a: Vec<&str> = telno.split('-').collect();
  println!("국번: {}", telno_a[0]);
  println!("사번: {}", telno_a[1]);
}