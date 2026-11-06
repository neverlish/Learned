import sh
import shlex
from ai1.object_model import Tool, Parameter

class CommandTool(Tool):
    def __init__(self, command_name: str, user: str | None = None, doc_link: str = ""):
        self.command_name = command_name
        self.user = user
        if doc_link:
            description = f"{command_name} 명령어를 실행하는 도구입니다. 참고: {doc_link}"
        else:
            description = f"{command_name} 명령어를 실행하는 도구입니다."

        parameters = [
            Parameter(
                name="args",
                type="string",
                description=f"{command_name} 명령어 뒤에 붙일 인자 문자열"
            )
        ]

        required = {"args"}

        super().__init__(
            name=command_name,
            description=description,
            parameters=parameters,
            required=required
        )

    def run(self, **kwargs):
        raw_args = kwargs.get("args", "")

        args = shlex.split(raw_args)

        if self.user is not None:
            return sh.sudo("-u", self.user, self.command_name, *args)

        return getattr(sh, self.command_name)(*args)


















