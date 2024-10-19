afile = "./fizzbuzz_python.txt"
bfile = "./fizzbuzz_rust.txt"

with open(afile, "r") as fp:
    astr = fp.read()

with open(bfile, "r") as fp:
    bstr = fp.read()

astr = astr.strip()
bstr = bstr.strip()

if astr == bstr:
    print("ok")
else:
    print("ng")
