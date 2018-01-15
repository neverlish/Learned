val = '01012341234'

if len(val) == 11 and val[:3] in ('010','011','016','017','018','019')
  print('ok')

import re 

if re.match('^01[1-9]\d{6,7}$', val):
  print('matched')
else:
  print('invalid')
