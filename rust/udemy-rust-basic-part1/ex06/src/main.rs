// fn main() {
//     let 참 = 5 > 1;
//     let 거짓 = -9.4 >= -3.1;

//     println!("{} {}", 참, 거짓);

//     println!("{}", 10 >= 5);

//     println!("{}", "abcb" > "abda");
//     println!("{}", "A" > "a");
// }

// fn main() {
//     let 참 = true;
//     let 거짓 = false;

//     println!("{} {} {} {}", 거짓 && 거짓, 거짓 && 참, 참 && 거짓, 참 && 참);
//     println!("{} {} {} {}", 거짓 || 거짓, 거짓 || 참, 참 || 거짓, 참 || 참);

//     println!("{}", !참);
//     println!("{}", 참 || 참 && !참);
// }

// fn main() {
//     // let mut n = 1;
//     // println!("{}", n);

//     // n = 2;
//     // println!("{}", n);

//     // n = 3;
//     // println!("{}", n);

//     // n = 3.14;
//     // println!("{}", n);

//     let mut n: f32 = 1.;
//     println!("{}", n);

//     n = 2.;
//     println!("{}", n);

//     n = 3.;
//     println!("{}", n);

//     n = 3.14;
//     println!("{}", n);
// }

// fn main() {
//     let a;
//     a = 12;
//     let b = a;
//     let c = b;
// }

fn main() {
    let mut n = 1;
    n = 2;
    println!("{}", n);

    n = 3;
    println!("{}", n);

    {
        let n = 3.14;
        println!("{}", n);
    }

    println!("{}", n);
}