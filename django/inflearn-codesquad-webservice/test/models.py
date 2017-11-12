class Text:
  def __init__(self, str):
    self.text = str

  def __str__(self):
    return 'Object: ' + self.text

t = Text('This is some text.')
print(t)
print(t.text)
