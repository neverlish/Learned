from ai1.tools.file_system.pwd import Pwd
from ai1.tools.file_system.ls import Ls
from ai1.tools.file_system.cat import Cat
from ai1.tools.file_system.echo import Echo

from ai1.tools.test_runner.test_runner import TestRunner

def main():
    pwd_tool = Pwd()
    ls_tool = Ls()
    cat_tool = Cat()
    echo_tool = Echo()
    test_runner = TestRunner()

    print("현재 작업 폴더:")
    print(pwd_tool.run(args=""))

    lesson_memo = """오늘 수업 메모
CommandTool은 명령어형 도구의 공통 부모입니다.
Pwd, Ls, Cat은 CommandTool을 상속합니다.
Echo는 file_path와 content를 따로 받습니다.
TestRunner는 test_directory를 받아 테스트를 실행합니다.
"""

    print("수업 메모 파일 작성:")
    print(
        echo_tool.run(
            file_path="data/notes/lesson_memo.txt",
            content=lesson_memo
        )
    )

    print("수업 메모 폴더 파일 목록:")
    print(ls_tool.run(args="data/notes"))

    print("수업 메모 파일 내용:")
    print(cat_tool.run(args="data/notes/lesson_memo.txt"))

    print("테스트 실행 결과:")
    test_result = test_runner.run(test_directory="tests")

    print("테스트 종료 코드:", test_result["return_code"])

    if test_result["stdout"]:
        print("표준 출력:")
        print(test_result["stdout"])

    if test_result["stderr"]:
        print("테스트 메시지:")
        print(test_result["stderr"])





if __name__ == "__main__":
    main()
