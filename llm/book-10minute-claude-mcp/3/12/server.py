from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP(name="server")


@mcp.tool()
def read_excel(file_name: str) -> list:
    """
    c:/test/ 아래의 엑셀 파일을 읽어 데이터를 리스트로 반환합니다.

    Parameters
    ----------
    file_name : str
        읽을 엑셀 파일의 이름
        예: 'data.xlsx'

    Returns
    -------
    list
        엑셀 데이터가 포함된 딕셔너리 리스트
        예: [{'name': '김철수', 'age': 30}, {...}]
    """
    import os
    import pandas as pd

    # pandas와 openpyxl 라이브러리 필요
    # pip install pandas openpyxl

    file_path = os.path.join(os.path.dirname(__file__), file_name)

    try:
        # 엑셀 파일이 존재하는지 확인
        if not os.path.exists(file_path):
            return [f"파일 '{file_name}'는 존재하지 않습니다."]

        # 엑셀 파일 읽기
        df = pd.read_excel(file_path)

        # 데이터프레임을 딕셔너리 리스트로 변환
        result = df.to_dict("records")

        return result
    except Exception as e:
        return [f"파일 '{file_name}'를 읽는 중 오류가 발생했습니다: {e}"]


@mcp.tool()
def write_excel(contents: list, file_name: str = "test.xlsx") -> str:
    """
    리스트를 엑셀 파일로 저장합니다.

    Parameters
    ----------
    contents : list
        딕셔너리 리스트 형태의 데이터
        예: [{'name': '김철수', 'age': 30}, {...}]
    file_name : str, optional
        저장할 엑셀 파일의 이름, 기본값은 'test.xlsx'

    Returns
    -------
    str
        파일 생성 완료 메시지
    """
    import os
    import pandas as pd

    file_path = os.path.join(os.path.dirname(__file__), file_name)

    try:
        # 딕셔너리 리스트를 데이터프레임으로 변환
        df = pd.DataFrame(contents)

        # 엑셀 파일로 저장
        df.to_excel(file_path, index=False)

        return f"엑셀 파일 '{file_path}'가 성공적으로 생성되었습니다."
    except Exception as e:
        return f"엑셀 파일 생성 중 오류가 발생했습니다: {str(e)}"


@mcp.tool()
def create_excel_with_formatting(
    contents: list, file_name: str = "formatted.xlsx"
) -> str:
    """
    리스트를 서식이 지정된 엑셀 파일로 저장합니다.

    Parameters
    ----------
    contents : list
        딕셔너리 리스트 형태의 데이터
        예: [{'name': '김철수', 'age': 30}, {...}]
    file_name : str, optional
        저장할 엑셀 파일의 이름, 기본값은 'formatted.xlsx'

    Returns
    -------
    str
        파일 생성 완료 메시지
    """
    import os
    import xlsxwriter

    file_path = os.path.join(os.path.dirname(__file__), file_name)

    try:
        # 엑셀 워크북 생성
        workbook = xlsxwriter.Workbook(file_path)

        # 워크시트 추가
        worksheet = workbook.add_worksheet("Data")

        # 헤더 스타일 정의
        header_format = workbook.add_format(
            {
                "bold": True,
                "font_color": "white",
                "bg_color": "#4F81BD",
                "align": "center",
                "valign": "vcenter",
                "border": 1,
            }
        )

        # 데이터 스타일 정의
        data_format = workbook.add_format({"border": 1})

        # 헤더가 있는지 확인
        if contents and len(contents) > 0:
            # 헤더 작성
            headers = list(contents[0].keys())
            for col_idx, header in enumerate(headers):
                worksheet.write(0, col_idx, header, header_format)

            # 데이터 작성
            for row_idx, row_data in enumerate(contents):
                for col_idx, key in enumerate(headers):
                    worksheet.write(
                        row_idx + 1, col_idx, row_data.get(key, ""), data_format
                    )

            # 열 너비 자동 조정
            for col_idx, _ in enumerate(headers):
                worksheet.set_column(col_idx, col_idx, 15)

        # 워크북 닫기
        workbook.close()

        return f"서식이 지정된 엑셀 파일 '{file_path}'가 성공적으로 생성되었습니다."
    except Exception as e:
        return f"서식이 지정된 엑셀 파일 생성 중 오류가 발생했습니다: {str(e)}"


@mcp.tool()
def append_to_excel(file_name: str, new_data: list) -> str:
    """
    기존 엑셀 파일에 새로운 데이터를 추가합니다.

    Parameters
    ----------
    file_name : str
        데이터를 추가할 엑셀 파일 이름
    new_data : list
        추가할 데이터가 포함된 딕셔너리 리스트
        예: [{'name': '홍길동', 'age': 25}, {...}]

    Returns
    -------
    str
        데이터 추가 결과 메시지
    """
    import os
    import pandas as pd

    file_path = os.path.join(os.path.dirname(__file__), file_name)

    try:
        # 파일이 존재하는지 확인
        if not os.path.exists(file_path):
            return f"파일 '{file_name}'이 존재하지 않습니다."

        # 기존 엑셀 파일 읽기
        existing_df = pd.read_excel(file_path)

        # 새 데이터를 데이터프레임으로 변환
        new_df = pd.DataFrame(new_data)

        # 두 데이터프레임 병합
        combined_df = pd.concat([existing_df, new_df], ignore_index=True)

        # 병합된 데이터프레임을 다시 엑셀로 저장
        combined_df.to_excel(file_path, index=False)

        return f"엑셀 파일 '{file_name}'에 새 데이터가 성공적으로 추가되었습니다."
    except Exception as e:
        return f"엑셀 파일에 데이터 추가 중 오류가 발생했습니다: {str(e)}"


# 서버 실행
if __name__ == "__main__":
    mcp.run()