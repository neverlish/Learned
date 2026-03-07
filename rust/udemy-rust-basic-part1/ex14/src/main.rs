// fn main() {
//     let 십육진수 = 0x10;
//     let 팔진수 = 0o10;
//     let 이진수 = 0b10;
//     let mut 십진수 = 10;
//     println!("{}, {}, {}, {}", 십육진수, 팔진수, 이진수, 십진수);

//     십진수 = 십육진수;
//     println!("{}", 십진수);

//     십진수 = 이진수;
//     println!("{}", 십진수);

//     eprintln!("{}, {}", 0xa, 0xA);
//     eprintln!("{}, {}", 0b11000000, 0xa0);
// }

// fn main() {
//     let a = 10_000_000;
//     let b = 0x_1234_5678;
//     let c = 0b_1111_1110;
//     let d = 0o_123_123_123;
// }

fn main() {
    let a1:i8 = 100;
    let a2:i16 = 100;
    let mut a3:i32 = 100;
    let a4:i64 = 100;
    let a5:i128 = 100;
    let a6:isize = 100;

    // a3 = a1 as i32;

    // let n = a3 + a1;
    let n = a3 + a1 as i32;
    println!("{}", n);
    println!("{}", a4 + a2 as i64);
}