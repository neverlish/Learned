# 07 - 1 - 2 HAS-A: 합성 또는 통합

class Gun:
  def __init__(self, kind):
    self.kind = kind

  def bang(self):
    print('bang bang!')

class Police:
  def __init__(self):
    self.gun = None

  def acquire_gun(self, gun):
    self.gun = gun

  def release_gun(self):
    gun = self.gun
    self.gun = None
    return gun

  def shoot(self):
    if self.gun:
      self.gun.bang()
    else:
      print('Unable to shoot')

if __name__ == '__main__':
  p1 = Police()
  print('p1 shoots')
  p1.shoot() # Unable to shoot
  print('')

  # p1은 아직 총을 소유하지 않음
  revolver = Gun('Revolver')
  # p1 이 revolver를 획득
  p1.acquire_gun(revolver)
  # 이제 p1이 총을 소유하므라
  # revolverr는 None이 된다
  revolver = None

  print('p1 shoots again')
  p1.shoot() # bang bang!
  print('')

  # p1이 총을 반납했으므로
  # 더 이상 총을 소유하지 않는다
  revolver = p1.release_gun()
  print('p1 shoots again')
  p1.shoot() # Unable to shoot
