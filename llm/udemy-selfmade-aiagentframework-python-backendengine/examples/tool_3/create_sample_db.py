import sqlite3
from pathlib import Path
db_path = Path("/home/momo7/projects/ai-1-agent-framework/data/counseling_notes/counseling_notes.db")

db_path.parent.mkdir(parents=True, exist_ok=True)
connection = sqlite3.connect(db_path)

cursor = connection.cursor()
cursor.execute("DROP TABLE IF EXISTS counseling_notes")
cursor.execute(
    """
    CREATE TABLE counseling_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT NOT NULL,
        note_date TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL
    )
    """
)

sample_notes = [
    ("민수", "2026-06-01", "과제", "파이썬 반복문 과제를 어려워해서 추가 설명이 필요합니다."),
    ("민수", "2026-06-03", "수업태도", "질문이 많아졌고 수업 참여도가 좋아졌습니다."),
    ("지윤", "2026-06-02", "진로", "데이터 분석 분야에 관심이 있어 관련 프로젝트를 추천했습니다."),
    ("하준", "2026-06-04", "과제", "과제 제출이 늦어져 학습 계획표를 함께 작성했습니다."),
    ("서연", "2026-06-05", "상담", "발표에 자신감이 부족해 작은 발표 연습부터 시작하기로 했습니다."),
]

cursor.executemany(
    """
    INSERT INTO counseling_notes (
        student_name,
        note_date,
        category,
        content
    )
    VALUES (?, ?, ?, ?)
    """,
    sample_notes
)

connection.commit()
connection.close()
print(f"샘플 상담 기록 데이터베이스를 만들었습니다: {db_path}")




