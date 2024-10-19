use rand::seq::SliceRandom;

fn main() {
    let mut nums = vec![];

    for i in 1..=75 { nums.push(i); }

    let mut rng = rand::thread_rng();
    nums.shuffle(&mut rng);

    for i in 0..25 {
        if i == 12 {
            print!(" *,");
        } else {
            print!("{:3},", nums[i]);
        }
        if i % 5 == 4 {
            println!("");
        }
    }
}