from ai1.tools.rest_api.notice_api_tool import NoticeRestApiTool
from ai1.tools.counseling.counseling_note_search_tool import CounselingNoteSearchTool

from ai1.tools.test_runner.test_runner import TestRunner

def main():
    notice_tool = NoticeRestApiTool()
    counseling_tool = CounselingNoteSearchTool()

    print("NoticeRestApiTool 정보:")
    print("도구 이름:", notice_tool.name)
    print("도구 설명:", notice_tool.description)
    print("도구 파라미터:", notice_tool.parameters)
    print()

    print("NoticeRestApiTool 호출 예시:")
    print(
        'notice_tool.run(base_url="https://notice.example.com", '
        'class_name="python", limit=3)'
    )
    print("실제 서버가 없는 경우에는 테스트에서 mock으로 검증합니다.")
    print()

    print("상담 기록 검색 결과:")
    result = counseling_tool.run(
        db_path="/home/momo7/projects/ai-1-agent-framework/data/counseling_notes/counseling_notes.db",
        student_name="민수",
        limit=3
    )
    print(result)
    print()

    print("상담 기록 키워드 검색 결과:")
    keyword_result = counseling_tool.run(
        db_path="/home/momo7/projects/ai-1-agent-framework/data/counseling_notes/counseling_notes.db",
        keyword="과제",
        limit=3
    )
    print(keyword_result)
    print()

    test_runner = TestRunner()
    test_result = test_runner.run(test_directory="tests")
    print("테스트 실행 결과:")
    print("테스트 종료 코드:", test_result["return_code"])

    if test_result["stdout"]:
        print("표준 출력:")
        print(test_result["stdout"])

    if test_result["stderr"]:
        print("테스트 메시지:")
        print(test_result["stderr"])



if __name__ == "__main__":
    main()
