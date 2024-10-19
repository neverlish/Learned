// import sys

// dicfile = "dict.txt"

// if len(sys.argv) < 2:
//     print("[USAGE] dictionary.py word")
//     quit()

// word = sys.argv[1]

// with open(dicfile, "rt", encoding="utf-8") as fp:
//     while True:
//         line = fp.readline()
//         if not line:
//             break
//         if word in line:
//             print(line.strip())
//             break


use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let dicfile = "dict.txt";
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        println!("[USAGE] dictionary word");
        return;
    }

    let word = &args[1];

    let fp = File::open(dicfile).unwrap();
    let reader = BufReader::new(fp);
    for line in reader.lines() {
        let line = line.unwrap();

        if line.find(word) == None {
            continue;
        }

        println!("{}", line);
    }
}