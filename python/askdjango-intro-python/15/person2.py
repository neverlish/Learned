class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def __repr__(self):
    return 'Person("{}", {})'.format(self.name, self.age)

  def __add__(self, value):
    return Person(self.name, self.age + value)
  
  def __iadd__(self, value):
    self.age += value
    return self
