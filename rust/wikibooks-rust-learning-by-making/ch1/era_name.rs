fn main() {
  for y in 1392..1451 {
    print!("서력 {} 년 = ", y);

    if y >= 1419 {
      if y == 1419 { println!("세종 원년");}
      else { println!("세종 {} 년", y - 1419 + 1);}
    } else if y >= 1401 {
      if y == 1401 { println!("태종 원년");}
      else { println!("태종 {} 년", y - 1401 + 1);}
    } else if y >= 1399 {
      if y == 1399 { println!("정종 원년");}
      else { println!("정종 {} 년", y - 1399 + 1);}
    } else if y >= 1392 {
      if y == 1392 { println!("태조 원년");}
      else { println!("태조 {} 년", y - 1392 + 1);}
    }
  }
}