# 11 - 2 - 2 추상 구문 트리

import ast

s = open('test.py').read()
node = ast.parse(s, 'test.py', 'exec')
g = ast.walk(node)
print(next(g)) # <_ast.Module object at 0x10b877be0>
print(next(g)) # <_ast.FunctionDef object at 0x10b877b00>
print(next(g)) # <_ast.Assign object at 0x10b89ddd8>

