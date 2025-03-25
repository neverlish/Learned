import sentencepiece as spm
import torch
import torchaudio
from lightning import ConformerRNNTModule
from torchaudio.models import Hypothesis, RNNTBeamSearch
from typing import List, Tuple
from transforms import GlobalStatsNormalization, FunctionalModule
import math

_expected_spm_vocab_size = 1023
_decibel = 2 * 20 * math.log10(torch.iinfo(torch.int16).max)
_gain = pow(10, 0.05 * _decibel)
_spectrogram_transform = torchaudio.transforms.MelSpectrogram(sample_rate=16000, n_fft=400, n_mels=80, hop_length=160)

def _piecewise_linear_log(x):
    x = x * _gain
    x[x > math.e] = torch.log(x[x > math.e])
    x[x <= math.e] = x[x <= math.e] / math.e
    return x


def post_process_hypos(
    hypos: List[Hypothesis], sp_model: spm.SentencePieceProcessor
) -> List[Tuple[str, float, List[int], List[int]]]:
    tokens_idx = 0
    score_idx = 3
    post_process_remove_list = [
        sp_model.unk_id(),
        sp_model.eos_id(),
        sp_model.pad_id(),
    ]
    filtered_hypo_tokens = [
        [token_index for token_index in h[tokens_idx][1:] if token_index not in post_process_remove_list] for h in hypos
    ]
    hypos_str = [sp_model.decode(s) for s in filtered_hypo_tokens]
    hypos_ids = [h[tokens_idx][1:] for h in hypos]
    hypos_score = [[math.exp(h[score_idx])] for h in hypos]

    nbest_batch = list(zip(hypos_str, hypos_score, hypos_ids))

    return nbest_batch

class SimpleConformerRNNT:
    def __init__(self, ckpt_path: str, sp_model_path: str, gmvn_stats_path: str):
        self.sp_model = spm.SentencePieceProcessor(model_file=sp_model_path)
        rnnt = ConformerRNNTModule.load_from_checkpoint(ckpt_path, sp_model=self.sp_model).eval()
        rnnt.model.to("cuda")
        self.decoder = RNNTBeamSearch(rnnt.model, _expected_spm_vocab_size)
        self.gmvn_stats_path = gmvn_stats_path

    def run_decoder(self, waveform):
        extra_pipeline= torch.nn.Sequential(
                FunctionalModule(_piecewise_linear_log),
                GlobalStatsNormalization(self.gmvn_stats_path),
        )
        with torch.no_grad():
            mel_f = _spectrogram_transform(waveform[0].squeeze()).transpose(1, 0)
            feats=extra_pipeline(mel_f)
            lengths=torch.tensor(feats.shape[0])
            hypotheses = self.decoder(feats.to("cuda"), lengths.to("cuda"), 3)
            result=post_process_hypos(hypotheses, self.sp_model)
        return result[0][0]




