use hound::WavWriter;
use std::f32::consts::PI;

const SAMPLE_RATE: u32 = 44100;
const TONE: f32 = 440.0;

fn main() {
    let spec = hound::WavSpec {
        channels: 1,
        sample_rate: SAMPLE_RATE,
        bits_per_sample: 16,
        sample_format: hound::SampleFormat::Int,
    };

    let mut fw = WavWriter::create("a.wav", spec).unwrap();
    let samples = SAMPLE_RATE * 3;
    for t in 0..samples {
        let v = ((t as f32 / SAMPLE_RATE as f32) * TONE * 2.0 * PI).sin();
        fw.write_sample((v * i16::MAX as f32) as i16).unwrap();

    }
}