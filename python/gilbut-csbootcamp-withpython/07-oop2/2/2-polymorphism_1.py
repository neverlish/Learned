# 07 - 2 - 2 다형성

class Animal:
  def eat(self):
    print('eat something')

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
