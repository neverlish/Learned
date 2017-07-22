class Person:
  def __init__(self, name, age, foods):
    self.name = name
    self.age = age
    self.foods = foods
     
  def __str__(self):
    return self.name

  def __repr__(self):
    return 'Person("{}", {})'.format(self.name, self.age)

  def __getitem__(self, key):
    return self.foods[key]

  def __setitem__(self, key, value):
    self.foods[key] = value

foods = ['사과', '피자', '치킨', '우유', '바나나']
tom = Person('Tom', 10, foods)
print(tom[3])

tom[3] = '초코우유'
print(tom.foods)
