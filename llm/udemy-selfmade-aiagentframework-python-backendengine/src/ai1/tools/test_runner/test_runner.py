# unittest , sys.executable

import subprocess
import sys

from ai1.object_model import Tool, Parameter

class TestRunner(Tool):
    def __init__(self):
        description = "지정한 테스트 폴더에서 파이썬 unittest 테스트를 실행하는 도구입니다."

        super().__init__(
            name="python_test_runner",
            description=description,
            parameters=[
                Parameter(
                    name="test_directory",
                    type="string",
                    description="실행할 테스트 파일들이 들어 있는 폴더"
                )
            ],
            required={"test_directory"}
        )

    def run(self, **kwargs) -> dict:
        test_directory = kwargs["test_directory"]

        command = [
            sys.executable,
            "-m",
            "unittest",   # test*.py
            "discover",
            "-s",
            test_directory
        ]
        result = subprocess.run(
            command,
            capture_output=True,
            text=True
        )

        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "return_code": result.returncode
        }



