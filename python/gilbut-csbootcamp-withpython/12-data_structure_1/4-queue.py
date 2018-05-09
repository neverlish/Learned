# 12 - 4 - 2 큐 구현

class Queue:
  def __init__(self):
    self.container = list()

  def enqueue(self, data):
    self.container.append(data)

  def dequeue(self):
    return self.container.pop(0)

  def empty(self):
    if not self.container:
      return True
    else:
      return False

  def peek(Self):
    return self.container[0]

if __name__ == '__main__':
  q = Queue()
  q.enqueue(1)
  q.enqueue(2)
  q.enqueue(3)
  q.enqueue(4)
  q.enqueue(5)

  while not q.empty():
    print(q.dequeue(), end = ' ') # 1 2 3 4 5
