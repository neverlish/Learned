# 06 - 4 - 2 클래스를 사용해 객체 만들기

class Person:
  def __init__(self, name, money):
    self.name = name
    self.money = money

  def give_money(self, other, money):
    self.money -= money
    other.get_money(money)

  def get_money(self, money):
    self.money += money

  def show(self):
    print('{} : {}'.format(self.name, self.money))

if __name__ == '__main__':
  g = Person('greg', 5000)
  j = Person('john', 2000)

  g.show() # greg : 5000
  j.show() # john : 2000
  
  g.give_money(j, 2000)
  print('')

  g.show() # greg : 3000
  j.show() # john : 4000

  print(type(Person.__init__)) # <class 'function'>
  print(type(Person.give_money)) # <class 'function'>
  print(type(Person.get_money)) # <class 'function'>
  print(type(Person.show)) # <class 'function'>

  print(type(g.give_money)) # <class 'method'>
  print(type(g.get_money)) # <class 'method'>
  print(type(g.show)) # <class 'method'>

  print(dir(g.give_money)) # ['__call__', '__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__func__', '__ge__', '__get__', '__getattribute__', '__gt__','__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__self__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
  print(g.give_money.__func__) # <function Person.give_money at 0x103689400>
  print(g.give_money.__self__) # <__main__.Person object at 0x103695b00>
  print(g.give_money.__func__ is Person.give_money) # True
  print(g.give_money.__self__ is g) # True

