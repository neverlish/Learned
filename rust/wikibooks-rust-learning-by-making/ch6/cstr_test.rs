use std::ffi::CString;

fn main() {
  let msg = "안녕하세요";
  let msg_cstr = CString::new(msg).unwrap();

  unsafe {
    // c_lang_lib::print_str(msg_cstr.as_ptr());
  }
}