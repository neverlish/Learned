# 07 - 1 - 2 HAS-A: 합성 또는 통합

class CPU:
  pass

class RAM:
  pass

class Computer:
  def __init__(self):
    self.cpu = CPU()
    self.ram = RAM()
