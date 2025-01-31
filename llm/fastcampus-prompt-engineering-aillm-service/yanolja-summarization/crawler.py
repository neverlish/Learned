import json
import time

from bs4 import BeautifulSoup
from selenium import webdriver

import sys

def crawl_yanolja_reviews(name, url):
  review_list = []
  driver = webdriver.Chrome()
  driver.get(url)

  time.sleep(3)

  scroll_count = 20

  for i in range(scroll_count):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

  html = driver.page_source
  soup = BeautifulSoup(html, 'html.parser')

  review_containers = soup.select('#__next > section > div > div.css-1js0bc8 > div > div > div')
  review_date = soup.select('#__next > section > div > div.css-1js0bc8 > div > div > div div.css-1ivchjf > p')

  for i in range(len(review_containers)):
    review_text = review_containers[i].find('p', class_='content-text').text
    # fill이 currentColor 이고 fill-rule이 evenodd 가 아닌 경우
    review_stars = review_containers[i].find_all('path', {'fill': 'currentColor'})
    exclude_review_stars = review_containers[i].find_all('path', {'fill': 'currentColor', 'fill-rule': 'evenodd'})
    star_cnt = len(review_stars) - len(exclude_review_stars)

    date = review_date[i].text

    review_dict = {
      'review': review_text,
      'stars': star_cnt,
      'date': date
    }

    review_list.append(review_dict)

  with open(f'./res/{name}.json', 'w') as f:
    json.dump(review_list, f, indent=4, ensure_ascii=False)
  

if __name__ == "__main__":
  name, url = sys.argv[1], sys.argv[2]
  crawl_yanolja_reviews(name=name, url=url)