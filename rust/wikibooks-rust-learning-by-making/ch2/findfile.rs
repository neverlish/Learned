// import sys, os

// if len(sys.argv) < 3:
//     print("fildfile.py (path) (keyword)")
//     quit()

// target_dir = sys.argv[1]
// keyword = sys.argv[2]

// for dirname, dirs, files in os.walk(target_dir):
//     for file in files:
//         if keyword in file:
//             fullpath = os.path.join(dirname, file)
//             print(fullpath)

use std::{env, path};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("findfile (path) (keyword)");
        return;
    }

    let target_dir = &args[1];
    let keyword = &args[2];

    let target = path::PathBuf::from(target_dir);
    findfile(&target, keyword);
}

fn findfile(target: &path::PathBuf, keyword: &str) {
    let files = target.read_dir().expect("존재하지 않는 경로");

    for dir_entry in files {
        let path = dir_entry.unwrap().path();

        if path.is_dir() {
            findfile(&path, keyword);
            continue;
        }

        let fname = path.file_name().unwrap().to_string_lossy();

        if None == fname.find(keyword) { continue; }

        println!("{}", path.to_string_lossy());
    }
}