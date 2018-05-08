# 11 - 2 - 1 컴파일러

from tokenize import tokenize
from io import BytesIO

s = open('test.py').read()
g = tokenize(BytesIO(s.encode('utf-8')).readline)
for token in g:
  print(token)

# TokenInfo(type=59 (ENCODING), string='utf-8', start=(0, 0), end=(0, 0), line='')
# TokenInfo(type=1 (NAME), string='def', start=(1, 0), end=(1, 3), line='def func(a, b):\n')
# TokenInfo(type=1 (NAME), string='func', start=(1, 4), end=(1, 8), line='def func(a, b):\n')
# ......
