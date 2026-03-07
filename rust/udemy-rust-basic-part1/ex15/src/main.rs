// fn main() {
//     let arr = [11,22,33];
//     let i = 2;
//     println!("{}", arr[i]);
// }

// fn main() {
//     let arr = [11,22,33];
//     // let i: u8 = 2;
//     let i: usize = 2;
//     println!("{}", arr[i]);
// }

// fn main() {
//     let r1 = 1.2;
//     let r2: f32 = 10./3.;
//     let r3: f64 = 10./3.;
//     let r4 = 3.91e222;
//     println!("{}, {}", r2, r3);
//     println!("{r4}");
// }

fn main() {
    let a: i16 = 12;
    let b: u32 = 4;
    let c: f32 = 3.14;
    println!("{}", a as i32 + b as i32 + c as i32);

    let d = 3.64;
    println!("{}", d as i32);

    let e: i32 = 500;
    let mut f: i8 = 0;
    f = e as i8;
    println!("{}", f);
    println!("{:b}", e);
}