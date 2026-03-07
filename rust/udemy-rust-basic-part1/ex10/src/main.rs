// fn main() {
//     let n = 1;
//     println!("{}", n);
//     sub();
// }

// fn sub() {

// }

// fn main() {
//     { let n = 10; }
//     println!("{}", n);
// }

// fn main() {
//     let mut n = 10;
//     n += 1;
//     println!("7:{}", n);

//     {
//         n = 20;
//         let mut n = 30;
//         n = 15;
//         println!("11:{}", n);
//     }
//     println!("13:{}", n);
// }

// fn main() {
//     let mut n = 1;

//     if true { 
//         let n = 2; 
//         println!("{}", n);
//     }
//     println!("{}", n);

//     while n > 0 {
//         n -= 1;
//         let n = 5;
//     }
//     println!("{}", n);
// }

fn main() {
    let 한글 = ["영","일","이","삼","사","오","육","칠","팔","구"];
    println!("{} {} {} {}", 한글[3], 한글[2], 한글[0], 한글[1]);

    println!("데이터 갯수:{}", 한글.len());

    // let n = [1,2,3,"4"];
    let n = [1,2,3,4];
    println!("{}", n[3]);

    let mut x = ["a"];
    println!("{}", x[0]);

    x[0] = "b";
    println!("{}", x[0]);
    // x[0] = 3;
    // x[-1] = "c";
    // println!("{}", x[-1]);
    
}