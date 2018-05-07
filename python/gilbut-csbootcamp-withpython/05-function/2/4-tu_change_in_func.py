# 05 - 2 - 4 객체 참조에 의한 전달(파이썬) - 변경 가능한 객체를 전달할 때

def change_value(tu):
  tu = ('I am your father!', 2, 3, 4)
  return tu

if __name__ == '__main__':
  tu = (1, 2, 3, 4)
  tu = change_value(tu)
  print(tu) # ('I am your father!', 2, 3, 4)
