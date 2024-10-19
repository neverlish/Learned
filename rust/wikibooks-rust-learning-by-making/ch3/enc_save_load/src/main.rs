use encoding_rs;
use std::fs;
use std::fs::File;
use std::io::Write;

fn main() {
    let filename = "test-euckr.txt";
    save_euckr(filename, "맛있게 먹으면 0칼로리");

    let s = load_euckr(filename);
    println!("{}", s);
}

fn save_euckr(filename: &str, text: &str) {
    let (enc, _, _) = encoding_rs::EUC_KR.encode(text);
    let buf = enc.into_owned();
    let mut file = File::create(filename).expect("생성");
    file.write(&buf[..]).expect("쓰기");
}

fn load_euckr(filename: &str) -> String {
    let buf = fs::read(filename).expect("읽기");
    let (dec, _, _) = encoding_rs::EUC_KR.decode(&buf);
    return dec.into_owned();
}