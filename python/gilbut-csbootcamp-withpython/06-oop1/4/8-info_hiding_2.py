# 06 - 4 - 5 정보 은닉

class Account:
  def __init__(self, name, money):
    self.name = name
    self.__balance = money

  def get_balance(self):
    return self.__balance

  def set_balance(self, money):
    if money < 0:
      return

    self.__balance = money

if __name__ == '__main__':
  my_acnt = Account('greg', 5000)
  my_acnt.__balance = -3000
  print(my_acnt.get_balance()) # 5000

  print(my_acnt.__dict__) # {'name': 'greg', '_Account__balance': 5000, '__balance': -3000}
