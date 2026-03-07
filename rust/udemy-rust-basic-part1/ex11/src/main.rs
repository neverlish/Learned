// #[allow(unused_variables)]
// fn main() {
//     // #[deny(unused_variables)]
//     let x = 1;

//     // #[warn(unused_variables)]
//     let y = 2;

//     // #[allow(unused_variables)]
//     let z = 3;
// }

// fn main() {
//     let x = ["A"];
//     #[warn(unconditional_panic)]
//     let y = x[1];
//     println!("{}", y);
// }

// fn main() {
//     let mut n = [10,20,30,40];
//     println!("{} {} {} {}", n[0], n[1], n[2], n[3]);

//     n[1] = 200;
//     println!("{} {} {} {}", n[0], n[1], n[2], n[3]);

//     // n[2] = 30.1;

//     n = [1,2,3,4];
//     println!("{} {} {} {}", n[0], n[1], n[2], n[3]);

//     // n = [1,2];
//     // println!("{} {}", n[0], n[1]);
// }

// fn main() {
//     let mut x = [40;10];
//     x[5] += 10;
//     println!("{} {}", x[1], x[5]);
//     println!("배열 크기: {}", x.len());
// }

// fn main() {
//     let mut fib = [1;20];

//     for i in 2..fib.len() {
//         println!("{}", i);
//         fib[i] = fib[i-2] + fib[i-1];
//     }

//     for i in 0..fib.len() {
//         println!("fib[{}] = {}", i, fib[i]);
//     }
// }

fn main() {
    let mut x = [[[9;5];3];4];
    x[3][2][4] = 1;
    println!("{} {}", x[0][0][0], x[3][2][4]);
    println!("{} {} {}", x.len(), x[0].len(), x[0][0].len());

    let l = 6;
    // let y = [0;l];
}