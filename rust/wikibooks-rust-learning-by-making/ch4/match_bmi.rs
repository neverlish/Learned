fn print_bmi(height: f32, weight: Option<f32>) {
  let bmi: Option<f32> = match weight {
    Some(w) => Some(w / (height / 100.0).powf(2.0)),
    None => None,
  };

  let msg = match bmi {
    Some(n) if n < 18.5 => "저체중",
    Some(n) if n < 23.0 => "정상",
    Some(n) if n < 25.0 => "비만전단계",
    Some(n) if n < 30.0 => "1단계 비만",
    Some(n) if n < 35.0 => "2단계 비만",
    Some(_) => "3단계 비만",
    None => "계산 불가"
  };

  println!("BMI = {:.1}, 결과 = {}", bmi.unwrap_or(0.0), msg);
}

fn main() {
  let height = 162.3;
  print_bmi(height, Some(48.0));
  print_bmi(height, Some(72.3));
  print_bmi(height, None);
}