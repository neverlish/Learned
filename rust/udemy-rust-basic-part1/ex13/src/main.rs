// fn main() {
//     // let a = [];
//     let a = [0; 0];
//     let v  = vec![];
//     let s = ["", 0];
// }

// fn main() {
//     let a = [10,20,30];
//     let v = vec![10,20,30];
//     println!("{:?}", a);
//     println!("{:?}", v);
// }

fn main() {
    let mut a1 = [10,20,30];
    let a2 = [40,50,60];
    println!("{:?} {:?}", a1, a2);
    a1 = a2;
    println!("{:?} {:?}", a1, a2);

    a1[0] = 100;
    println!("{:?} {:?}", a1, a2);

    let mut v1 = vec![10,20,30];
    let v2 = vec![40,50,60];
    println!("{:?} {:?}", v1, v2);
    // v1 = v2;
    v1 = v2.clone();
    println!("{:?}", v1);
    v1[0] = 100;
    println!("{:?}", v1);

    println!("{:?}", v2);
}