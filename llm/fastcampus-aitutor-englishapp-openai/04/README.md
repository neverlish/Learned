# fc-asr

## Environment Setup

- Ubuntu or Linux
- Python3.8 or newer
- GPU (CUDA 11.8)
- Pytorch 2.1.0 or newer

## Librispeech Download
```bash
python download_librispeech.py
```

## Sentence Piece Training
```bash
python train_spm.py --librispeech-path ./corpus
```

## ASR Training
```bash
python train.py --exp-dir ./exp --global-stats-path ./global_stats.json --librispeech-path ./corpus --sp-model-path ./spm_unigram_1023.model  --nodes 1 --gpus 1 --epoch 20
```

## Voice Assistants
```bash
python webapp.py --host 0.0.0.0 --port 8080
```
