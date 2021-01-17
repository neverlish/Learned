# AND 연산 함수

def AND(x1, x2):
    # 파라미터 값(w1, w2, 임계값)
    w1, w2, threshold = 0.2, 0.2, 0.3
    temp = w1 * x1 + w2 * x2

    if temp <= threshold:
        return 0
    elif temp > threshold:
        return 1


print(AND(0, 0))
print(AND(0, 1))
print(AND(1, 0))
print(AND(1, 1))
