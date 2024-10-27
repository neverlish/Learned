class Counter:
    value = 0

    def inc(self):
        self.value += 1
        print("value=", self.value)


def count(counter):
    counter.inc()


a = Counter()
count(a)
count(a)

a = None
count(a)
