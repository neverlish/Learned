# 27 Use Python Classes

class Ball:
  def __init__(self, radius, color, weight):
    self.radius = radius
    self.color = color
    self.weight = weight


class Football:
  """A standard, regulation NFL ball"""
  def __init__(self, diamater, color, pressure):
    self.diamater = diamater
    self.color = color
    self.pressure = pressure
  
  def inflate(self, psi):
    self.pressure = self.pressure + psi

  def deflate(self, psi):
    self.pressure = self.pressure - psi

class PatriotsBall(Football):
  def inflate(self, pri):
    self.pressure = self.pressure - psi
