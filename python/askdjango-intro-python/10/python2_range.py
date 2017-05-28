# -*- coding: utf-8 -*0
from __future__ import unicode_literals
import time

begin_t = time.time()

# for i in range(300000000): 오래걸림
for i in xrange(300000000): # 금방 끝남
  print(i)
  break

print('{:.1f}초 소요'.format(time.time() - begin_t))
