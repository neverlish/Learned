import requests
import os
import json

def scrape_linkedin_profile(linkedin_profie_url: str):
  
  # api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
  # headers = {'Authorization': f'Bearer {os.environ.get("PROXYCURL_API_KEY")}'}
  # response = requests.get(
  #   api_endpoint, params={'url': linkedin_profie_url}, headers=headers
  # )

  # data = response.json()

  with open("./third_parties/johnrmarty.json", "r") as f:
    data = json.load(f)

  data = {
    k: v
    for k, v in data.items()
    if v not in ([], "", "", None)
      and k not in ["people_also_viewed", "certifications", "similarly_named_profiles", "summary"]
  }

  if data.get("groups"):
    for group_dict in data.get("groups"):
      group_dict.pop("profile_pic_url")

  return data