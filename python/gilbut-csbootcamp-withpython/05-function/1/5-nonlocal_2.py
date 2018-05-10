# 05 - 1 - 2 전역 변수와 지역 변수 - nonlocal 키워드

def outer():
  a = 2
  b = 3
  
  def inner():
    nonlocal a
    a = 100
  inner()

  print('locals in outer : a = {}, b = {}'.format(a, b)) # locals in outer : a = 100, b = 3

if __name__ == '__main__':
  outer()
