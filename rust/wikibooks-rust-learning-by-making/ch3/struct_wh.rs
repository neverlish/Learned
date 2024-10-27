struct Body {
  weight: f64,
  height: f64,
}

fn main() {
  let hong = Body {
    weight: 80.0,
    height: 165.0,
  };

  let lim = Body {
    weight: 65.0,
    height: 170.0,
  };

  println!("홍길동 = {:.1}", calc_bmi(&hong));
  println!("임꺽정 = {:.1}", calc_bmi(&lim));
}

fn calc_bmi(body: &Body) -> f64 {
  let h = body.height / 100.0;
  body.weight / h.powf(2.0)
}