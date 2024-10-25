import platform, os
from ctypes import *

pf = platform.system()
print(pf)

if pf == "Windows":
    libfile = "mycalc.dll"
elif pf == "Darwin":
    libfile = "libmycalc.dylib"
else:
    libfile = "libmycalc.so"

libpath = os.path.join(os.path.dirname(__file__), libfile)
print("lib=", libpath)

mycalc = cdll.LoadLibrary(libpath)

print(mycalc.rust_mul(100, 8))
print(mycalc.rust_mul(8, 9))
