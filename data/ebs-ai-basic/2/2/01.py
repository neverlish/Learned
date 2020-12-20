# 2차원 배열의 정보를 화면으로 출력하기
import turtle
import numpy as np

# 데이터

myImg = np.array([[0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 1, 1, 1, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 0, 0, 0],
                  [1, 1, 1, 1, 1, 0, 0, 0],
                  [0, 1, 1, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0]])

pixelSize = 10


def putPixel(x, y, pSize, pCol):
    turtle.penup()
    turtle.goto(x*pSize, (-1)*y*pSize)
    turtle.pendown()
    turtle.begin_fill()
    turtle.fillcolor(pCol)
    turtle.setheading(45)
    turtle.circle(pSize/2, steps=4)
    turtle.end_fill()


for j in range(0, 8):
    for i in range(0, 8):
        if (myImg[j][i] > 0):
            putPixel(i, j, pixelSize, 'orange')
        else:
            putPixel(i, j, pixelSize, 'white')
