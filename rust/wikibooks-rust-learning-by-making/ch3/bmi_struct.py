height_cm = float(input("키(cm) : "))
weight = float(input("몸무게(kg) : "))

height = height_cm / 100.0
bmi = weight / (height**2)

bmi_list = [
    {"min": 0, "max": 18.5, "label": "저체중"},
    {"min": 18.5, "max": 25, "label": "정상"},
    {"min": 25, "max": 30, "label": "비만전단계"},
    {"min": 30, "max": 35, "label": "1단계 비만"},
    {"min": 35, "max": 40, "label": "2단계 비만"},
    {"min": 40, "max": 99, "label": "3단계 비만"},
]

result = "계산 불가"
for range in bmi_list:
    if range["min"] <= bmi < range["max"]:
        result = range["label"]

print("BMI={:.1f}, 비만도 = {}".format(bmi, result))
