struct Body {
  height: f64,
  weight: f64,
}

impl Body {
  fn calc_bmi(&self) -> f64 {
    let h = self.height / 100.0;
    self.weight / h.powf(2.0)
  }

  fn calc_per(&self) -> f64 {
    self.calc_bmi() / 22.0 * 100.0
  }
}

fn main() {
  let yang = Body {
    height: 160.0,
    weight: 70.0,
  };
  println!("BMI = {:.2}", yang.calc_bmi());
  println!("비만율 = {:.1}%", yang.calc_per());
}