# 06 - 4 - 4 객체 지향으로 은행 입출금 프로그램 만들기

class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  @classmethod
  def init_from_string(cls, string):
    '''
    string format: '<name>_<age>'
    '''
    name, age = string.split('_')
    return cls(name, int(age))

if __name__ == '__main__':
  p = Person.init_from_string('greg_30')
  print(p.name) # greg
  print(p.age) # 30
