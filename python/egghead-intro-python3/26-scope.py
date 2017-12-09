# 26 Understand Scope in Python

def whoami():
  def local_groot():
    i = 'I am local groot'
    print(id(i)) # 4415178120
    print(i) # I am local groot

  def nonlocal_groot():
    nonlocal i
    i = 'I am nonlocal groot'

  def global_groot():
    global i
    i = 'I am global groot'

  i = 'I am groot'
  print(id(i)) # 4415183984
  print(i) # I am groot
  local_groot()
  print(id(i)) # 4415183984
  print(i) # I am groot
  nonlocal_groot()
  print(i) # I am nonlocal groot
  global_groot()
  print(i) # I am nonlocal groot

whoami()
print(i) # I am global groot
