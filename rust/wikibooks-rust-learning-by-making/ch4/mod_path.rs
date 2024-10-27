mod aaa {
  pub mod bbb {
    pub mod ccc {
      pub fn print() {
        println!("aaa::bbb::ccc::print");
      }
    }
  }

  pub mod ddd {
    pub mod eee {
      pub fn print() {
        println!("aaa::ddd::eee::print");
      }
    }

    pub mod fff {
      pub fn print() {
        super::eee::print();
        super::super::bbb::ccc::print();
      }
    }
  }
}

fn main() {
  aaa::bbb::ccc::print();
  aaa::ddd::eee::print();
  crate::aaa::ddd::fff::print();
}