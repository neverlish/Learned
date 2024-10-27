use std::f32::consts::PI;
use hound::WavWriter;
use std::io::{Write, Seek};

const SAMPLE_RATE: f32 = 44100.0;

#[derive(Debug)]
pub struct Note {
  pub no: i32,
  pub len: i32,
}

pub fn write(filename: &str, notes: Vec<Note>, bpm: f32) {
  let spec = hound::WavSpec {
    channels: 1,
    sample_rate: SAMPLE_RATE as u32,
    bits_per_sample: 16,
    sample_format: hound::SampleFormat::Int,
  };

  let mut fw = WavWriter::create(filename, spec).unwrap();

  for note in notes.into_iter() {
    let len = (4.0 / note.len as f32 * (60.0 / bpm) * SAMPLE_RATE) as u32;
    let tone = if note.no >= 0 {
      440.0 * 2.0f32.powf((note.no - 69) as f32 / 12.0)
    } else { 0.0 };

    write_tone(&mut fw, tone, len);
  }
}

fn write_tone<W>(fw: &mut WavWriter<W>, tone: f32, len: u32) 
where W: Write + Seek {
    for t in 0..len {
        let a = t as f32 / SAMPLE_RATE;
        let v = (a * tone * 2.0  * PI).sin();
        fw.write_sample((v * i16::MAX as f32) as i16).unwrap();
    }
}

#[cfg(test)]
mod wav_writer_test {
  use super::*;
  #[test]
  fn notes_test() {
    let notes: Vec<Note> = vec![
      Note{no: 60, len: 4},
      Note{no: 62, len: 4},
      Note{no: 64, len: 4},
    ];

    write("test.wav", notes, 120.0);
  }
}