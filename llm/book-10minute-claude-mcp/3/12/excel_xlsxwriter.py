import xlsxwriter
import os

# 엑셀 파일 생성
workbook = xlsxwriter.Workbook(os.path.dirname(__file__) + "/employee_details.xlsx")

# 워크시트 추가
worksheet = workbook.add_worksheet("직원정보")
summary_sheet = workbook.add_worksheet("요약")

# 셀 서식 정의
header_format = workbook.add_format(
    {
        "bold": True,
        "font_color": "white",
        "bg_color": "#4472C4",
        "align": "center",
        "valign": "vcenter",
        "border": 1,
    }
)

date_format = workbook.add_format({"num_format": "yyyy-mm-dd"})
money_format = workbook.add_format({"num_format": "#,##0"})
percent_format = workbook.add_format({"num_format": "0.0%"})
border_format = workbook.add_format({"border": 1})

# 열 너비 설정
worksheet.set_column("A:A", 15)
worksheet.set_column("B:B", 10)
worksheet.set_column("C:C", 15)
worksheet.set_column("D:D", 15)
worksheet.set_column("E:E", 15)

# 헤더 추가
headers = ["이름", "나이", "부서", "입사일", "연봉"]
for col, header in enumerate(headers):
    worksheet.write(0, col, header, header_format)

# 데이터 추가
employee_data = [
    ["김철수", 30, "개발팀", "2021-01-15", 45000000],
    ["이영희", 35, "마케팅팀", "2019-05-20", 55000000],
    ["박지민", 28, "인사팀", "2022-03-10", 42000000],
    ["최유진", 32, "영업팀", "2020-11-05", 60000000],
    ["정민수", 27, "개발팀", "2022-08-22", 43000000],
]

# 데이터 행 채우기
for row_num, employee in enumerate(employee_data):
    worksheet.write(row_num + 1, 0, employee[0], border_format)  # 이름
    worksheet.write(row_num + 1, 1, employee[1], border_format)  # 나이
    worksheet.write(row_num + 1, 2, employee[2], border_format)  # 부서
    worksheet.write(row_num + 1, 3, employee[3], date_format)  # 입사일
    worksheet.write(row_num + 1, 4, employee[4], money_format)  # 연봉

# 조건부 서식 추가 (연봉 5000만원 이상인 경우 배경색 변경)
worksheet.conditional_format(
    "E2:E6",
    {
        "type": "cell",
        "criteria": ">=",
        "value": 50000000,
        "format": workbook.add_format({"bg_color": "#C6EFCE"}),
    },
)

# 합계 계산
total_row = len(employee_data) + 1
worksheet.write(total_row, 0, "합계", workbook.add_format({"bold": True}))
worksheet.write_formula(total_row, 4, f"=SUM(E2:E{total_row})", money_format)

# 요약 시트에 데이터 추가
summary_sheet.write(
    0,
    0,
    "부서별 인원 및 평균 연봉",
    workbook.add_format({"bold": True, "font_size": 14}),
)
summary_sheet.write(2, 0, "부서", header_format)
summary_sheet.write(2, 1, "인원수", header_format)
summary_sheet.write(2, 2, "평균 연봉", header_format)

# 부서 목록 (중복 제거)
departments = list(set([emp[2] for emp in employee_data]))

# 부서별 통계 계산 및 기록
for i, dept in enumerate(departments):
    row = i + 3
    dept_employees = [emp for emp in employee_data if emp[2] == dept]
    count = len(dept_employees)
    avg_salary = sum([emp[4] for emp in dept_employees]) / count

    summary_sheet.write(row, 0, dept, border_format)
    summary_sheet.write(row, 1, count, border_format)
    summary_sheet.write(row, 2, avg_salary, money_format)

# 차트 추가
chart = workbook.add_chart({"type": "column"})
chart.add_series(
    {
        "name": "평균 연봉",
        "categories": ["요약", 3, 0, 3 + len(departments) - 1, 0],
        "values": ["요약", 3, 2, 3 + len(departments) - 1, 2],
        "data_labels": {"value": True, "num_format": "#,##0"},
    }
)
chart.set_title({"name": "부서별 평균 연봉"})
chart.set_x_axis({"name": "부서"})
chart.set_y_axis({"name": "연봉(원)"})
summary_sheet.insert_chart("E3", chart, {"x_scale": 1.5, "y_scale": 1.5})

# 엑셀 파일 저장
workbook.close()

print("employee_details.xlsx 파일이os.path.dirname(__file__) +   폴더에 생성되었습니다.")