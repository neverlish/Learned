# 05 - 1 - 2 전역 변수와 지역 변수 - 전역 변수

g_var = 10

def func():
  print("g_var = {}".format(g_var))

if __name__ == '__main__':
  func()
