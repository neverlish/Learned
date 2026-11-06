import sqlite3
from ai1.object_model import Tool, Parameter

class CounselingNoteSearchTool(Tool):
    def __init__(self):
        description = "SQLite 데이터베이스에서 학생 상담 기록을 검색하는 도구입니다."

        super().__init__(
            name="counseling_note_search",
            description=description,
            parameters=[
                Parameter(
                    name="db_path",
                    type="string",
                    description="상담 기록 SQLite 데이터베이스 파일 경로"
                ),
                Parameter(
                    name="student_name",
                    type="string",
                    description="검색할 학생 이름"
                ),
                Parameter(
                    name="keyword",
                    type="string",
                    description="상담 내용에서 찾을 검색어"
                ),
                Parameter(
                    name="limit",
                    type="integer",
                    description="가져올 최대 상담 기록 수"
                )
            ],
            required={"db_path"}
        )

    def run(self, **kwargs) -> str:
        db_path = kwargs["db_path"]

        student_name = kwargs.get("student_name")
        keyword = kwargs.get("keyword")
        limit = kwargs.get("limit", 5)

        where_clauses = []
        params = []

        if student_name:
            where_clauses.append("student_name = ?")
            params.append(student_name)

        if keyword:
            where_clauses.append("content LIKE ?")
            params.append(f"%{keyword}%")

        sql = """
                    SELECT student_name, note_date, category, content
                    FROM counseling_notes
                """

        if where_clauses:
            sql += " WHERE " + " AND ".join(where_clauses)

        sql += " ORDER BY note_date DESC LIMIT ?"

        params.append(limit)

        try:

            connection = sqlite3.connect(db_path)
            cursor = connection.cursor()
            cursor.execute(sql, params)
            rows = cursor.fetchall()

            connection.close()

            if not rows:
                return "검색된 상담 기록이 없습니다."

            lines = ["상담 기록 검색 결과"]

            for index, row in enumerate(rows, start=1):
                name, note_date, category, content = row
                lines.append(
                    f"{index}. {note_date} / {name} / {category} / {content}"
                )

            return "\n".join(lines)

        except sqlite3.Error as error:
            return f"상담 기록 데이터베이스 오류: {error}"
        except Exception as error:
            return f"상담 기록 검색 오류: {error}"

