# 11 - 2 - 3 심벌 테이블

import symtable

s = open('test.py').read()
sym = symtable.symtable(s, 'test.py', 'exec')
print(sym.get_name()) # top
print(sym.get_symbols()) # [<symbol 'func'>, <symbol 'a'>, <symbol 'b'>, <symbol 'c'>, <symbol 'print'>]

print(sym.get_children()) # [<Function SymbolTable for func in test.py>]

func_sym = sym.get_children()[0]
print(func_sym.get_name()) # func
print(func_sym.get_symbols()) # [<symbol 'a'>, <symbol 'b'>]
