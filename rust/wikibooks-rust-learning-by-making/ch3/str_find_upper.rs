fn main() {
  let s = format!("{}{}",
    "There is more happiness in giving ",
    "than there is in receiving.");

  let res = s.find(|c:char| c.to_ascii_uppercase() == 'S');

  match res {
    Some(i) => println!("S = {}B", i),
    None => println!("None"),
  };
}