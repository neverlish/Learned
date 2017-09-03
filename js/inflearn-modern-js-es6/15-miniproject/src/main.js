class Blog {
  constructor() {
    const dataURL = 'https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info';
    this.setInitData(dataURL);
  }

  setInitData(dataURL) {
    this.getData(dataURL, this.insertPosts);
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
    const ul = document.querySelector('.blogList > ul');
    list.forEach((v) => {
      ul.innerHTML += `<li><a href=${v.link}>${v.title}</a></li>`;
    })
  }
}

export default Blog;
