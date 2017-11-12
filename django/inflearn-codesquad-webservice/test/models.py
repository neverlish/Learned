class Text:
  def __init__(self, str):
    self.text = str

  def __str__(self):
    return 'Text: ' + self.text

class User:
  numUsers = 0
  def __init__(self, name):
    self.numArticle = 0
    self.name = name
    self.articles = []
    User.numUsers += 1

  def write(self, text):
    self.articles.append(text)
    self.numArticle += 1

  def __str__(self):
    return 'User : %s %s' % (self.name, self.articles)

t = Text('This is some text.')
t2 = Text('This is some text2')
user = User('Honux')
user.write(t2)
user.write(t2)
print(t) # Text: This is some text.
print(user, user.numArticle) # # User : Honux [<__main__.Text object at 0x10d9ae6a0>, <__main__.Text object at 0x10d9ae6a0>] 2
