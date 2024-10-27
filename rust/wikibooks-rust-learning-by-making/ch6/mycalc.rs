// rustc --crate-type="dylib" mycalc.rs -o libmycalc.so
#[no_mangle]
pub extern "C" fn rust_mul(a: isize, b: isize) -> isize {
  a * b
}