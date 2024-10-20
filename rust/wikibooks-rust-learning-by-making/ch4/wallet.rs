enum Currency {
  Currency100(isize),
  Currency500(isize),
  Currency1000(isize),
  Currency5000(isize),
  Currency10000(isize),
  Currency50000(isize),
}

impl Currency {
  fn calc_price(&self) -> isize {
    match *self {
      Currency::Currency100(n) => n * 100,
      Currency::Currency500(n) => n * 500,
      Currency::Currency1000(n) => n * 1000,
      Currency::Currency5000(n) => n * 5000,
      Currency::Currency10000(n) => n * 10000,
      Currency::Currency50000(n) => n * 50000,
    }
  }
}

fn main() {
  let wallet: Vec<Currency> = vec![
    Currency::Currency100(3),
    Currency::Currency500(2),
    Currency::Currency1000(6),
    Currency::Currency5000(1),
    Currency::Currency10000(8),
    Currency::Currency50000(3),
  ];

  let total = wallet.iter()
    .fold(0, |sum, v| sum + v.calc_price());

  println!("지갑 안의 금액은 {} 원입니다", total);
}