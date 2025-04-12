from pydantic import BaseModel
from typing import List

class NewsletterThemeOutput(BaseModel):
    theme: str
    sub_themes: List[str]