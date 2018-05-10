# 06 - 4 - 4 객체 지향으로 은행 입출금 프로그램 만들기

class A:
  @staticmethod
  def f():
    print('static method')

  @classmethod
  def g(cls):
    print(cls.__name__)

if __name__ == '__main__':
  a = A()
  a.f() # static method
  a.g() # A

  print(type(A.f)) # <class 'function'>
  print(type(A.g)) # <class 'method'>
