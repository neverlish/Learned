// fn main() {
//     let mut n = 1;
//     // let mut 조건식 = true;

//     while n < 10 {
//         n += 1;
//         // if n >= 10 {
//         //     조건식 = false; 
//         // }
//         println!("{}", n * n);
//     }
// }

// fn main() {
//     let mut n = 0;
//     while n < 50 {
//         n += 1;
//         if n % 3 != 0 {
//             if n * n <= 400 {
//                 println!("{} => {}", n, n * n);
//             }
//         }
//     }
// }

// fn main() {
//     let mut n = 0;
//     while n < 50 {
//         n += 1;
//         if n % 3 == 0 { continue; }
//         if n * n > 400 { break; }
//         println!("{} => {}", n, n * n);
//     }
// }

// fn main() {
//     let mut n = 0;

//     while true {
//         n += 1;
//         println!("{} => {}", n, n * n);

//         if n >= 100 { break; }
//     }
// }

// fn main() {
//     let mut n = 0;

//     loop {
//         n += 1;
//         println!("{} => {}", n, n * n);

//         if n >= 100 { break; }
//     }
// }

// fn main() {
//     for x in 2..10 {
//         for y in 1..10 {
//             println!("{} * {} = {}", x, y, x * y);
//         }
//         println!("");
//     }
// }

fn main() {
    let mut limit = 4;

    for n in 1..limit+2 {
        limit -= 1;
        println!("{} {}", limit, n);
    }
    println!("{}", limit);
}