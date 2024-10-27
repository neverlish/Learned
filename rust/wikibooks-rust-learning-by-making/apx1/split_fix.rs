fn main() {
  let target = "aaa,bbb,ccc";
  let mut lines = vec![];
  for line in target.split(",") {
    lines.push(line.to_string());
  }
  
  println!("{:?}", lines);

  let lines: Vec<String> = target.split(",").map(|s| s.to_string()).collect();
  println!("{:?}", lines);
}