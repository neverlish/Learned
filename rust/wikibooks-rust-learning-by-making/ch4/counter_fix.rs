struct Counter {
  value: i64,
}

impl Counter {
  fn new() -> Self {
    Counter { value: 0 }
  }

  fn inc(&mut self) {
    self.value += 1;
    println!("value={}", self.value);
  }
}

fn count(counter: Option<&mut Counter>) {
  match counter {
    None => return,
    Some(c) => c.inc(),
  }
}

fn main() {
  let mut a = Counter::new();
  count(Some(&mut a));
  count(Some(&mut a));

  let a = None;
  count(a);
}