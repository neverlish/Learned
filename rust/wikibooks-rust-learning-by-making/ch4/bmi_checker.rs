fn main() {
  let body = Body::new(163.0, 75.2, "성은");
  body.print_result();
  let body = Body::new(158.2, 55.0, "가빈");
  body.print_result();
  let body = Body::new(174.2, 54.2, "채연");
  body.print_result();
}

struct BmiRange {
  min: f64,
  max: f64,
  label: String,
}

impl BmiRange {
  fn new(min: f64, max: f64, label: &str) -> Self {
    BmiRange {
      min,
      max,
      label: label.to_string(),
    }
  }

  fn test(&self, v: f64) -> bool {
    (self.min <= v) && (v < self.max)
  }
}

struct Body {
  height: f64,
  weight: f64,
  name: String,
}

impl Body {
  fn new(height: f64, weight: f64, name: &str) -> Self {
    Body {
      height,
      weight,
      name: name.to_string(),
    }
  }

  fn calc_bmi(&self) -> f64 {
    self.weight / (self.height / 100.0).powf(2.0)
  }

  fn print_result(&self) {
    let bmi = self.calc_bmi();
    let bmi_list = [
      BmiRange::new(0.0, 18.5, "저체중"),
      BmiRange::new(18.5, 23.0, "정상"),
      BmiRange::new(23.0, 25.0, "비만전단계"),
      BmiRange::new(25.0, 30.0, "1단계 비만"),
      BmiRange::new(30.0, 35.0, "2단계 비만"),
      BmiRange::new(35.0, 99.9, "3단계 비만"),
    ];

    let mut result = String::from("계산 불가");

    for range in bmi_list {
      if range.test(bmi) {
        result = range.label.clone();
        break;
      }
    }

    println!("{}님, BMI = {:.1}, 결과 = {}", self.name, bmi, result);

  }
}