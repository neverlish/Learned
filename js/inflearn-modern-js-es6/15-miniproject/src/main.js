class Blog {
  constructor() {
    this.setInitVariables();
    this.registerEvents();
    this.likedSet = new Set();
  }

  setInitVariables() {
    this.blogList = document.querySelector('.blogList > ul');
  }

  registerEvents() {
    const startBtn = document.querySelector('.start');
    const dataURL = 'https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info';

    startBtn.addEventListener('click', () => {
      this.setInitData(dataURL);
    });

    this.blogList.addEventListener('click', ({target}) => {
      const targetClassName = target.className;
      // classname이 like라면 내 찜 목록에 새로운 블로그제목을 추가한다그
      if (targetClassName !== 'like') return;
      const postTitle = target.previousElementSibling.textContent;
      this.likedSet.add(postTitle);
    });
  }

  setInitData(dataURL) {
    this.getData(dataURL, this.insertPosts.bind(this));
  }

  getData(dataURL, fn) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener('load', () => {
      const list = JSON.parse(JSON.parse(oReq.responseText).body);
      fn(list);
    });
    oReq.open('GET', dataURL);
    oReq.send();
  }

  insertPosts(list) {
    list.forEach((v) => {
      this.blogList.innerHTML += `
        <li>
          <a href=${v.link}>${v.title}</a>
          <div class="like">찜하기</div>
        </li>`;
    })
  }
}

export default Blog;
