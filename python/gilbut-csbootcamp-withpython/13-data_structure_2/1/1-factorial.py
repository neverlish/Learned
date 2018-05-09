# 13 - 1 - 1 팩토리얼

def factorial(n):
  if n <= 1:
    return 1
  return factorial(n - 1) * n

if __name__ == '__main__':
  n = 3
  res = factorial(n)
  print('The factorial of {} is {}'.format(n, res))
  # The factorial of 3 is 6
