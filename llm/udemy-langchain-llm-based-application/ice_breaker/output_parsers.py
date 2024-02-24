from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List

class PersonIntel(BaseModel):
    summary: str = Field(description="Summary of the person")
    facts: List[str] = Field(description="Interesting facts about the person")
    topics_of_interest: List[str] = Field(description="Topics of interest for the person")
    ice_breakers: List[str] = Field(description="Create ice breakers to open a conversation with them")

    def to_dict(self):
        return {
            "summary": self.summary, 
            "facts": self.facts, 
            "topics_of_interest": self.topics_of_interest, 
            "ice_breakers": self.ice_breakers
        }

person_intel_parser = PydanticOutputParser(pydantic_object=PersonIntel)