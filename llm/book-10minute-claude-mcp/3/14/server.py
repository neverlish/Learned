from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP(name="server")


@mcp.tool()
def read_hwp(file_name: str) -> str:
    """한글 문서(.hwp)를 읽어 텍스트로 반환합니다.

    olefile 라이브러리를 사용하여 한글 문서의 텍스트 내용을 추출합니다.

    Args:
        file_name (str): 읽을 한글 문서의 이름
            예: 'document.hwp'

    Returns:
        str: 한글 문서에서 추출한 텍스트 내용 또는 오류 메시지
    """
    import os
    import olefile

    # 상대 경로인 경우 현재 디렉토리 기준으로 절대 경로 변환
    file_path = os.path.join(os.path.dirname(__file__), file_name)

    try:
        # 한글 파일 열기
        if not olefile.isOleFile(file_path):
            return f"오류: '{file_path}'는 올바른 한글 문서 형식이 아닙니다."

        ole = olefile.OleFileIO(file_path)

        # 텍스트 스트림 읽기
        if ole.exists("PrvText"):
            text_stream = ole.openstream("PrvText")
            text_data = text_stream.read().decode("utf-16-le", errors="replace")
            ole.close()
            return text_data
        else:
            ole.close()
            return "텍스트 내용을 추출할 수 없습니다. 지원되지 않는 한글 문서 형식일 수 있습니다."

    except Exception as e:
        return f"한글 문서 읽기 오류: {str(e)}"


@mcp.tool()
def write_md_to_hwpx(md_content: str, output_filename: str) -> str:
    """
    마크다운 문자열을 .hwpx 파일로 변환합니다.
    간단한 구조로, 책 예제용 기본 기능만 제공합니다.
    gen.py 파일이 같은 폴더에 함께 있어야 합니다.
    """
    import os
    import tempfile
    import shutil
    from gen import create_mimetype_file, create_settings_xml, create_version_xml
    from gen import create_preview_text, create_container_files, create_content_hpf
    from gen import create_header_xml, create_section_xml
    from bs4 import BeautifulSoup
    import markdown
    import zipfile

    try:
        # 임시 폴더 생성
        temp_dir = tempfile.mkdtemp()

        # 마크다운 → HTML → soup
        html = markdown.markdown(md_content)
        soup = BeautifulSoup(html, "html.parser")

        # 제목 추출
        h1 = soup.find("h1")
        title = h1.text if h1 else "문서"

        # 구조 생성
        os.makedirs(os.path.join(temp_dir, "META-INF"), exist_ok=True)
        os.makedirs(os.path.join(temp_dir, "Contents"), exist_ok=True)
        os.makedirs(os.path.join(temp_dir, "Preview"), exist_ok=True)

        # 각 구성 요소 생성
        create_mimetype_file(temp_dir)
        create_settings_xml(temp_dir)
        create_version_xml(temp_dir)
        create_preview_text(temp_dir, soup)
        create_container_files(temp_dir)
        create_content_hpf(temp_dir, title)
        create_header_xml(temp_dir)
        create_section_xml(temp_dir, soup)

        # 압축 → HWPX 저장
        output_path = os.path.join(os.path.dirname(__file__), output_filename)
        with zipfile.ZipFile(output_path, "w") as zip_file:
            zip_file.write(
                os.path.join(temp_dir, "mimetype"),
                "mimetype",
                compress_type=zipfile.ZIP_STORED,
            )
            for root, _, files in os.walk(temp_dir):
                for file in files:
                    if file != "mimetype":
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, temp_dir)
                        zip_file.write(
                            file_path, arcname, compress_type=zipfile.ZIP_DEFLATED
                        )

        shutil.rmtree(temp_dir)
        return f"{output_filename} 파일로 변환 완료!"
    except Exception as e:
        return f"변환 실패: {e}"


# 서버 실행
if __name__ == "__main__":
    mcp.run()