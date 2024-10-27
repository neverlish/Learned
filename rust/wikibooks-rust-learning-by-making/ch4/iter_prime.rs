struct PrimeIterator {
  n: u8,
}
impl PrimeIterator {
  fn new() -> Self { PrimeIterator { n: 1 } }

  fn is_prime(&self) -> bool {
    for i in 2..self.n {
      if self.n % i == 0 {
        return false;
      }
    }
    return true;
  }
}

impl Iterator for PrimeIterator {
  type Item = u8;

  fn next(&mut self) -> Option<Self::Item> {
    loop {
      self.n += 1;

      if std::u8::MAX == self.n {
        return None;
      }

      if self.is_prime() {
        return Some(self.n);
      }
    }
  }
}

fn main() {
  let prime_iter = PrimeIterator::new();

  for n in prime_iter {
    print!("{},", n);
  }
}