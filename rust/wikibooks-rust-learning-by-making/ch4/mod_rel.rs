mod random {
  pub mod linear {
    pub fn rand() -> u32 {
      1
    }
  }

  pub mod xorshift {
    pub fn rand() -> u32 {
      super::linear::rand()
    }
  }
}

fn main() {
  println!("{}", random::xorshift::rand());
}