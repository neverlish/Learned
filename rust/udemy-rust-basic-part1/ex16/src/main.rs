// fn main() {
//     let a = true;
//     println!("{}", a);
//     let c = 'A';
//     println!("{}", c);
//     let d = 'B';
//     println!("{}", d);

//     // let e = c + d;
//     let e = c as i32 + d as i32;
//     println!("{}", e);

//     // let f = false + true;
//     let f = false as i32 + true as i32;
//     println!("{}", f);

//     println!("{} {} {} {}", 'A' as i32, 'B' as i32, true as i32, false as i32);

//     for n in 32..127 {
//         println!("{} => {}", n, n as u8 as char);
//     }

//     for n in 160..256 {
//         println!("{} => {}", n, n as u8 as char);
//     }
// }

// fn main() {
//     let a = ();
//     let b = {12;34;56};
//     let c = {13;34;56;};
//     let d = {};
//     let e = if false {};
//     let f = while false {};

//     println!("{:?} {} {:?} {:?} {:?} {:?}", a, b, c, d, e, f);
// }

// fn main() {
//     let a1: [char;3] = ['a', 'b', 'c'];
//     let a2: [f64;100] = [0.0f64;100];
//     let v1: Vec<char> = vec!['a', 'B', 'f'];
//     let v2: Vec<i32> = vec![0;100];
// }

// fn main() {
//     // let n = 20;
//     const N: usize = 20;
//     let a = [0;N];
    
//     println!("{:?}", a);
// }

fn main() {
    let a: () = 4 / 3;
    println!("{:?}", a);
}