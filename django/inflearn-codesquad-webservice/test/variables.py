class User:
  num_users = 0 # class variables
  def __init__(self, name):
    self.name = name # instance variables
    User.num_users += 1

u = User('honux')
print(User.num_users, u.name) # 1 honux

u2 = User('crong')
print(User.num_users, u2.name) # 2 crong

print(User.num_users, u.num_users, u2.num_users) # 2 2 2
