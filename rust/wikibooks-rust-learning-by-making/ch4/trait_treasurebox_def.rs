trait TreasureBox {
  fn open(&self, key_no: i32) -> bool {
    self.get_key_no() == key_no
  }
  fn check(&self);
  fn get_key_no(&self) -> i32;
}

struct JewelryBox {
  price: i32,
  key_no: i32,
}

impl TreasureBox for JewelryBox {
  fn check(&self) {
    println!("보석 상자였다. {} 골드 입수", self.price);
  }

  fn get_key_no(&self) -> i32 {
    self.key_no
  }
}

struct EmptyBox {
  key_no: i32,
}

impl TreasureBox for EmptyBox {
  fn check(&self) {
    println!("상자는 비어 있다.");
  }

  fn get_key_no(&self) -> i32 {
    self.key_no
  }
}

fn open_box(tbox: &impl TreasureBox, key_no: i32) {
  if !tbox.open(key_no) {
    println!("열쇠가 맞지 않아 상자가 열리지 않는다.");
    return;
  }
  tbox.check();
}

fn main() {
  let box1 = JewelryBox {
    price: 30,
    key_no: 1,
  };

  let box2 = EmptyBox {
    key_no: 1,
  };

  let box3 = JewelryBox {
    price: 50,
    key_no: 2,
  };

  open_box(&box1, 1);
  open_box(&box2, 1);
  open_box(&box3, 1);
}