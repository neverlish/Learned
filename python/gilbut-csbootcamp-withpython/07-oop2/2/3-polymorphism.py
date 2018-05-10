# 07 - 2 - 2 다형성

from abc import *

class Animal(metaclass = ABCMeta):
  @abstractmethod
  def eat(self):
    pass

class Lion(Animal):
  def eat(self):
    print('eat meat')

class Deer(Animal):
  def eat(self):
    print('eat grass')

class Human(Animal):
  def eat(self):
    print('eat meat and grass')

if __name__ == '__main__':
  animals = []
  animals.append(Lion())
  animals.append(Deer())
  animals.append(Human())

  for animal in animals:
    animal.eat()

  # a = Animal() # TypeError: Can't instantiate abstract class Animal with abstract methods eat
