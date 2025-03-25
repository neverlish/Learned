import glob
import os
import csv
import logging
import torchaudio
from tqdm.contrib import tzip
from argparse import ArgumentParser
import io
import codecs
def prepare_common_gender(datafolder, savefolder):
    dataset = {'train', 'dev', 'test'}
    if not os.path.exists(savefolder):
        os.mkdir(savefolder)
    for data in dataset:
        idx=0
        csv_lines=[]
        files = glob.glob(datafolder+"/*/"+data+".csv")
        for filename in files:
            print(filename)
            base_folder=os.path.abspath(os.path.dirname(filename))
            f = open(filename, 'rt', encoding='utf-16-le')
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                if row[-1] == 'male' or row[-1] == 'female':
                    wav_file= os.path.join(base_folder, data, row[1], row[2])
                    path_parts = wav_file.split(os.path.sep)
                    file_name, wav_format = os.path.splitext(path_parts[-1])

                    # Peeking at the signal (to retrieve duration in seconds)
                    if os.path.isfile(wav_file):
                        info = torchaudio.info(wav_file)
                    else:
                        msg = "\tError loading: %s" % (str(len(file_name)))
                        logger.info(msg)
                        continue
            
                    audio_duration = info.num_frames / info.sample_rate
                    csv_line=[ idx, wav_file, wav_format, str(audio_duration), row[-1]]
                    csv_lines.append(csv_line)
                    idx+=1
        # CSV column titles
        csv_header = ["ID", "wav", "wav_format", "duration", "gender"]
    
        # Add titles to the list at indexx 0
        csv_lines.insert(0, csv_header)
        csv_file=os.path.join(savefolder, data+".csv")
    
        # Writing the csv lines
        with open(csv_file, mode="w", encoding="utf-8") as csv_f:
            csv_writer = csv.writer(
                csv_f, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )
    
            for line in csv_lines:
                csv_writer.writerow(line)
    
        




if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('--datafolder', type=str, help='original data folder')
    parser.add_argument('--savefolder', type=str, help='processed data folder')
    args = parser.parse_args()
    datafolder = args.datafolder
    savefolder = args.savefolder
    prepare_common_gender(datafolder, savefolder)
