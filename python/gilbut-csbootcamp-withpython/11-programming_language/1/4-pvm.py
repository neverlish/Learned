# 11 - 2 - 4 바이트 코드와 PVM

import dis

s = open('test.py').read()
g = dis.get_instructions(s)

for inst in g:
  print(inst.opname.ljust(20), end = '')
  print(inst.argval)

# LOAD_CONST          <code object func at 0x1090a26f0, file "<disassembly>", line 1>
# LOAD_CONST          func
# MAKE_FUNCTION       0
# STORE_NAME          func
# LOAD_CONST          10
# STORE_NAME          a
# LOAD_CONST          20
# STORE_NAME          b
# LOAD_NAME           func
# LOAD_NAME           a
# LOAD_NAME           b
# CALL_FUNCTION       2
# STORE_NAME          c
# LOAD_NAME           print
# LOAD_NAME           c
# CALL_FUNCTION       1
# POP_TOP             None
# LOAD_CONST          None
# RETURN_VALUE        None
