import requests
from tqdm import tqdm
import os
import tarfile


def download_file(url, destination_folder):
    local_filename = url.split('/')[-1]
    full_path = os.path.join(destination_folder, local_filename)
    
    # Stream download to handle large files
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        total_size_in_bytes = int(r.headers.get('content-length', 0))
        progress_bar = tqdm(total=total_size_in_bytes, unit='iB', unit_scale=True)
        with open(full_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                progress_bar.update(len(chunk))
                f.write(chunk)
        progress_bar.close()
    print(f"File: {local_filename} Downloaded")
    return full_path

def extract_tar_file(tar_path, extract_path):
    with tarfile.open(tar_path) as tar:
        tar.extractall(path=extract_path)
    os.remove(tar_path)
    print(f"Extraction completed. Files are extracted to {extract_path}")

# Define the URL of the dataset part you want to download
BASE_URL="http://www.openslr.org/resources/12/"
urls = ["test-clean.tar.gz", "train-clean-100.tar.gz", "train-clean-360.tar.gz", "train-other-500.tar.gz", "dev-clean.tar.gz", "dev-other.tar.gz"]

# Define where you want to save the dataset (make sure this directory exists)
destination_folder = "./corpus/"

if not os.path.exists(destination_folder):
    os.mkdir(destination_folder)

downloaded_files=[]
# Download all files
for url in urls:
    filename = download_file(BASE_URL+url, destination_folder)
    downloaded_files.append(filename)

# Untar files
for filename in downloaded_files:
    extract_tar_file(filename, destination_folder)
