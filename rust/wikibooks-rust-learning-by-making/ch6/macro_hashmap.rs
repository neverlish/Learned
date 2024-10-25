macro_rules! map_init {
  ($($key: expr => $val: expr), *) => {{
    let mut tmp = std::collections::HashMap::new();
    $(
      tmp.insert($key, $val);
    )*
    tmp
  }}
}

fn main() {
  let week = map_init![
    "mon" => "월요일",
    "tue" => "화요일",
    "wed" => "수요일",
    "thu" => "목요일",
    "fri" => "금요일",
    "sat" => "토요일",
    "sun" => "일요일"
  ];

  println!("mon={}", week["mon"]);
  println!("tue={}", week["tue"]);
}