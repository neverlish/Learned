height_cm = float(input("키(cm) : "))
weight = float(input("몸무게(kg) : "))

height = height_cm / 100.0
bmi = weight / (height**2)
print("BMI={:.1f}".format(bmi))

if bmi < 18.5:
    print("저체중")
elif bmi < 23:
    print("정상")
elif bmi < 25:
    print("비만전단계")
elif bmi < 30:
    print("1단계 비만")
elif bmi < 35:
    print("2단계 비만")
else:
    print("3단계 비만")
