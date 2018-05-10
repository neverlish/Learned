# 05 - 2 - 4 객체 참조에 의한 전달(파이썬) - 변경 가능한 객체를 전달할 때

def func(li):
  li = ['I am your father!', 2, 3, 4]

if __name__ == '__main__':
  li = [1, 2, 3, 4]
  func(li)
  print(li) # [1, 2, 3, 4]
