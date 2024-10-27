import sys

dicfile = "dict.txt"

if len(sys.argv) < 2:
    print("[USAGE] dictionary.py word")
    quit()

word = sys.argv[1]

with open(dicfile, "rt", encoding="utf-8") as fp:
    while True:
        line = fp.readline()
        if not line:
            break
        if word in line:
            print(line.strip())
            break
