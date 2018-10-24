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


class WriterAndReader {
  constructor(newsPaper) {
    this._newsPaper = newsPaper;
  }
  update(news) {
    console.log(`전달 받은 뉴스 - ${news}`);
    this._newsPaper.setNews(`변형된 뉴스 - ${news}`);
  }
}

let newsPaper = new NewsPaper();

newsPaper.add(new WriterAndReader(newsPaper));

// 상태 변경
newsPaper.setNews('북한 미사일 발사!!!');

/*
...
전달 받은 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스- 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 -변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 -변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 -변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 -변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 -변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 변형된 뉴스 - 북한 미사일 발사!!!
...
*/
