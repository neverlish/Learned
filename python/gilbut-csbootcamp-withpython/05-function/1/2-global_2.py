# 05 - 1 - 2 전역 변수와 지역 변수 - 전역 변수

g_var = 10

def func():
  g_var = 20
  print('g_var = {} in function'.format(g_var)) # g_var = 20 in function

if __name__ == '__main__':
  func()
  print('g_var = {} in main'.format(g_var)) # g_var = 10 in main
