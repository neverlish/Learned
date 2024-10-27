import sys, os

if len(sys.argv) < 3:
    print("fildfile.py (path) (keyword)")
    quit()

target_dir = sys.argv[1]
keyword = sys.argv[2]

for dirname, dirs, files in os.walk(target_dir):
    for file in files:
        if keyword in file:
            fullpath = os.path.join(dirname, file)
            print(fullpath)
