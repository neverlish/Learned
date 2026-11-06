import sys
import os
from pathlib import Path
from dotenv import load_dotenv

project_root = Path(__file__).resolve().parents[1]
load_dotenv(project_root / ".env")

print("Python 실행 위치:", sys.executable)
print("현재 작업 폴더:", os.getcwd())
print("프로젝트 루트:", project_root)

api_key = os.getenv("OPENAI_API_KEY")
print("OPENAI_API_KEY 설정 여부:", "설정됨" if api_key else "비어 있음")
print(api_key)