# 05 - 1 - 2 전역 변수와 지역 변수 - nonlocal 키워드

a = 1

def outer():
  b = 2
  c = 3
  print(a, b, c) # 1 2 3
  def inner():
    d = 4
    e = 5
    print(a, b, c, d, e) # 1 2 3 4 5
  inner()

if __name__ == '__main__':
  outer()
