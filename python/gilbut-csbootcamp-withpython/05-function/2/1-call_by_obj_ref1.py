# 05 - 2 - 3 객체 참조에 의한 전달(파이썬) - 변경 불가능한 객체를 전달할 때

def change_value(x, value):
  x = value
  print('x : {} in change_value'.format(x)) # x : 20 in change_value

if __name__ == '__main__':
  x = 10
  change_value(x, 20)
  print('x : {} in main'.format(x)) # x : 10 in main
