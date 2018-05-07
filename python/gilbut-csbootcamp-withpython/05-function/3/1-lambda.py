li = [i for i in range(1, 11)]
print(li) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

li.sort(key = lambda x: x % 2 == 0)
print(li) # [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]

f = lambda x: x ** 2
print(f(2)) # 4

print(f(5)) # 25

f1 = lambda li, idx: li[idx]
# f2 = lambda li, idx, value: li[idx] = value # SyntaxError: can't assign to lambda
