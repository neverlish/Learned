from ai1.tools.base.command_tool import CommandTool

class Pwd(CommandTool):
    def __init__(self, user: str | None = None):
        doc_link = "https://www.gnu.org/software/coreutils/manual/html_node/pwd-invocation.html"

        super().__init__(
            command_name="pwd",
            user=user,
            doc_link=doc_link
        )
