from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)