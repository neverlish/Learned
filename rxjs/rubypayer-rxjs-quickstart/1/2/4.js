class NewsPaper {
  constructor() {
    this._observers = [];
  }

  setNews(news) {
    this.notify(news);
  }

  add(observer) {
    this._observers.push(observer);
  }

  remove(observer) {
    let idx = this._observers.indexOf(observer);
    if (idx !== -1) {
      this._observers.splice(idx, 1);
    }
  }

  notify(news) {
    this._observers.forEach(v => {
      v.update(news);
    });
  }
}

class NewsScrapper {
  update(news) {
    console.log(`뉴스를 스크랩하자 - ${news}`);
  }
}

class NewsReader {
  update(news) {
    console.log(`뉴스를 읽자 - ${news}`);
  }
}

let newsPaper = new NewsPaper();

// 구독하기
newsPaper.add(new NewsScrapper());
newsPaper.add(new NewsReader());

// 상태 변경
newsPaper.setNews('북한 미사일 발사!!!');
newsPaper.setNews('코스피 최저점 이탈!!!');
newsPaper.setNews('남북평화회담 성사');
newsPaper.setNews('남북통일');

/*
뉴스를 스크랩하자 - 북한 미사일 발사!!!
뉴스를 읽자 - 북한 미사일 발사!!!
뉴스를 스크랩하자 - 코스피 최저점 이탈!!!
뉴스를 읽자 - 코스피 최저점 이탈!!!
뉴스를 스크랩하자 - 남북평화회담 성사
뉴스를 읽자 - 남북평화회담 성사
뉴스를 스크랩하자 - 남북통일
뉴스를 읽자 - 남북통일
*/
