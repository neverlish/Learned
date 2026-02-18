from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP(name="server")


@mcp.tool()
def create_folder(folder_name: str) -> str:
    """
    c:/test/ 아래 폴더를 생성합니다.

    Parameters
    ----------
    folder_name : str
        생성할 폴더 이름

    Returns
    -------
    str
        생성 결과 메시지
    """
    import os

    folder_path = os.path.join(os.path.dirname(__file__), folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        return f"폴더 '{folder_name}' 가 생성되었습니다."
    else:
        return f"폴더 '{folder_name}' 는 이미 존재합니다."


@mcp.tool()
def delete_folder(folder_name: str) -> str:
    """
    c:/test/ 아래 폴더를 삭제합니다.

    Parameters
    ----------
    folder_name : str
        삭제할 폴더 이름

    Returns
    -------
    str
        삭제 결과 메시지
    """
    import os

    folder_path = os.path.join(os.path.dirname(__file__), folder_name)
    if os.path.exists(folder_path):
        os.rmdir(folder_path)
        return f"폴더 '{folder_name}' 가 삭제되었습니다."
    else:
        return f"폴더 '{folder_name}' 는 존재하지 않습니다."


@mcp.tool()
def list_folders() -> list:
    """
    c:/test/ 아래 폴더 목록을 반환합니다.

    Returns
    -------
    list
        폴더 목록
    """
    import os

    folder_path = os.path.dirname(__file__)
    folders = [
        f
        for f in os.listdir(folder_path)
        if os.path.isdir(os.path.join(folder_path, f))
    ]
    return folders


@mcp.tool()
def write_file(file_name: str, content: str) -> str:
    """
    c:/test/ 아래에 파일을 생성하고 내용을 작성합니다.

    Parameters
    ----------
    file_name : str
        생성할 파일 이름 (확장자 포함)
    content : str
        파일에 작성할 내용

    Returns
    -------
    str
        파일 작성 결과 메시지
    """
    import os

    file_path = os.path.join(os.path.dirname(__file__), file_name)
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return f"파일 '{file_name}'에 내용이 성공적으로 작성되었습니다."
    except Exception as e:
        return f"파일 작성 중 오류가 발생했습니다: {str(e)}"


@mcp.tool()
def read_file(file_name: str) -> str:
    """
    c:/test/ 아래의 파일 내용을 읽어옵니다.

    Parameters
    ----------
    file_name : str
        읽을 파일 이름 (확장자 포함)

    Returns
    -------
    str
        파일 내용 또는 오류 메시지
    """
    import os

    file_path = os.path.join(os.path.dirname(__file__), file_name)
    if not os.path.exists(file_path):
        return f"파일 '{file_name}'이 존재하지 않습니다."

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return content
    except Exception as e:
        return f"파일 읽기 중 오류가 발생했습니다: {str(e)}"


@mcp.tool()
def append_to_file(file_name: str, content: str) -> str:
    """
    c:/test/ 아래의 파일에 내용을 추가합니다.

    Parameters
    ----------
    file_name : str
        내용을 추가할 파일 이름 (확장자 포함)
    content : str
        추가할 내용

    Returns
    -------
    str
        파일 추가 결과 메시지
    """
    import os

    file_path = os.path.join(os.path.dirname(__file__), file_name)
    if not os.path.exists(file_path):
        return f"파일 '{file_name}'이 존재하지 않습니다."

    try:
        with open(file_path, "a", encoding="utf-8") as f:
            f.write(content)
        return f"파일 '{file_name}'에 내용이 성공적으로 추가되었습니다."
    except Exception as e:
        return f"파일 내용 추가 중 오류가 발생했습니다: {str(e)}"


@mcp.tool()
def list_files() -> list:
    """
    c:/test/ 아래 파일 목록을 반환합니다.

    Returns
    -------
    list
        파일 목록
    """
    import os

    folder_path = os.path.dirname(__file__)
    files = [
        f
        for f in os.listdir(folder_path)
        if os.path.isfile(os.path.join(folder_path, f))
    ]
    return files


# 서버 실행
if __name__ == "__main__":
    mcp.run()