import os
import sqlite3
import tempfile
import unittest

from ai1.tools.counseling.counseling_note_search_tool import CounselingNoteSearchTool

class CounselingNoteSearchToolTest(unittest.TestCase):
    def setUp(self):
        self.tool = CounselingNoteSearchTool()
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
        self.db_path = temp_file.name
        temp_file.close()

        connection = sqlite3.connect(self.db_path)
        cursor = connection.cursor()
        cursor.execute(
            """
            CREATE TABLE counseling_notes
            (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                student_name TEXT NOT NULL,
                note_date    TEXT NOT NULL,
                category     TEXT NOT NULL,
                content      TEXT NOT NULL
            )
            """
        )
        cursor.executemany(
            """
            INSERT INTO counseling_notes (student_name,
                                          note_date,
                                          category,
                                          content)
            VALUES (?, ?, ?, ?)
            """,
            [
                ("민수", "2026-06-01", "과제", "반복문 과제를 어려워했습니다."),
                ("민수", "2026-06-03", "수업태도", "수업 참여도가 좋아졌습니다."),
                ("지윤", "2026-06-02", "진로", "데이터 분석에 관심이 있습니다."),
            ]
        )
        connection.commit()
        connection.close()

    def tearDown(self):
        if os.path.exists(self.db_path):
            os.remove(self.db_path)

    def test_init(self):
        self.assertEqual(self.tool.name, "counseling_note_search")
        self.assertEqual(self.tool.required, {"db_path"})

    def test_search_by_student_name(self):
        result = self.tool.run(
            db_path=self.db_path,
            student_name="민수",
            limit=5
        )

        self.assertIn("민수", result)
        self.assertIn("반복문", result)
        self.assertIn("수업 참여도", result)

    def test_search_by_keyword(self):
        result = self.tool.run(
            db_path=self.db_path,
            keyword="데이터",
            limit=5
        )

        self.assertIn("지윤", result)
        self.assertIn("데이터 분석", result)

    def test_search_no_result(self):
        result = self.tool.run(
            db_path=self.db_path,
            student_name="없는학생",
            limit=5
        )

        self.assertIn("검색된 상담 기록이 없습니다", result)

if __name__ == "__main__":
    unittest.main()
