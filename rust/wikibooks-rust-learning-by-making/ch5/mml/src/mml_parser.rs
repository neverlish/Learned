use crate::wav_writer::Note;

pub fn parse(src: String) -> Vec<Note> {
  let mut result = vec![];
  let mut octave = 5;
  let mut length = 4;

  let mut it = src.chars();

  while let Some(ch) = it.next() {
    match ch {
      'a'..'g' => {
        let note = match ch {
          'c' => 0,
          'd' => 2,
          'e' => 4,
          'f' => 5,
          'g' => 7,
          'a' => 9,
          'b' => 11,
          _ => 0,
        };
        let no = note + octave * 12;
        result.push(Note{no, len: length});
      },
      'r' => result.push(Note{no: -1, len: length}),
      'o' => {
        let v = it.next().expect("o 뒤에 숫자를 지정");
        let o = v as i32 - '0' as i32;
        if o >= 0 && o < 9 { octave = o; }
      },
      'l' => {
        let v = it.next().expect("l 뒤에 숫자를 지정");
        let l = v as i32 - '0' as i32;
        if l >= 1 && l <= 8 { length = l; }
      },
      _ => {}
    };
  }

  result
}

#[cfg(test)]
mod mml_parser_test {
  use super::*;

  #[test]
  fn parse_test() {
    let mml = "l2 o5 cde".to_string();
    let notes = parse(mml);

    assert_eq!(notes[0].no, 60);
    assert_eq!(notes[0].len, 2);
    assert_eq!(notes[1].no, 62);
    assert_eq!(notes[2].no, 64);
  }
}