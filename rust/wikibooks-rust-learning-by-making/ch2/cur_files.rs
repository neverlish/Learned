use std::fs;

fn main() {
  let files = fs::read_dir(".").expect("올바르지 않은 경로입니다.");

  for ent in files {
    let entry = ent.unwrap();
    let path = entry.path();
    let fname = path.to_str().unwrap_or("올바르지 않은 파일 이름입니다.");
    println!("{}", fname);
  }
}