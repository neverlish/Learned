# 06 - 4 - 5 정보 은닉

class Account:
  def __init__(self, name, money):
    self.name = name
    # 인스턴스 멤버 선언이 아니라 setter 메서드를 호출
    self.balance = money

  @property
  def balance(self):
    return self._balance

  @balance.setter
  def balance(self, money):
    if money < 0:
      return

    # 실제 인스턴스 멤버 선언이 일어나는 부분(생성자 호출시)
    self._balance = money

if __name__ == '__main__':
  my_acnt = Account('greg', 5000)
  my_acnt.balance = -3000
  print(my_acnt.balance) # 5000

  print(my_acnt.__dict__) # {'name': 'greg', '_balance': 5000}
  my_acnt._balance = -3000
  print(my_acnt.balance) # -3000
