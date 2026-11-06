import os

from ai1.object_model import Tool, Parameter

class Echo(Tool):
    """ path, content """
    def __init__(self):
        description = "파일 경로와 내용을 받아 필요한 폴더를 만들고 파일을 작성하는 도구입니다."
        # echo centent > path
        super().__init__(
            name="echo",
            description=description,
            parameters=[
                Parameter(
                    name="file_path",
                    type="string",
                    description="내용을 쓸 파일 경로"
                ),
                Parameter(
                    name="content",
                    type="string",
                    description="파일에 기록할 내용"
                )
            ],
            required={"file_path", "content"}
        )

    def run(self, **kwargs) -> str:
        file_path = kwargs["file_path"]
        content = kwargs["content"]
        folder_path = os.path.dirname(file_path)

        if folder_path:
            os.makedirs(folder_path, exist_ok=True)

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)

        return f"파일을 작성했습니다: {file_path}"



