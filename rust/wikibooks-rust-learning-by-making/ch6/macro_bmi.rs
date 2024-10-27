macro_rules! bmi_select {
  ($bmi: expr, $($label: expr => $range: expr);+) => {{
    let mut result = "계산 불가";
    $(
      if $range.start <= $bmi && $bmi < $range.end {
        result = $label;
      }
    )+
    result
  }}
}

fn main() {
  let h: f32 = 158.0;
  let w: f32 = 63.0;

  let bmi = w / (h / 100.0).powf(2.0);

  let label = bmi_select![
    bmi,
    "저체중" => 0.0..18.5;
    "정상" => 18.5..23.0;
    "과체중" => 23.0..25.0;
    "1단계 비만" => 25.0..30.0;
    "2단계 비만" => 30.0..35.0;
    "3단계 비만" => 35.0..99.9
  ];
  println!("결과 : {}", label);
}