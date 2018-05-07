# 05 - 1 - 2 전역 변수와 지역 변수 - 지역 변수

g_var = 10

def func():
  global g_var
  g_var = 20

if __name__ == '__main__':
  print('g_var : {} before'.format(g_var)) # g_var : 10 before
  func()
  print('g_var : {} after'.format(g_var)) # g_var : 20 after
