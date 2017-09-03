class Blog {
  constructor() {
    const dataURL = 'https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info';
    this.setInitData(dataURL);
  }

  setInitData(dataURL) {
    this.getData(dataURL);
  }

  getData(dataURL) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener('load', () => {
      const list = JSON.parse(JSON.parse(oReq.responseText).body);
      
      list.forEach((v) => {
        console.log(v.title);
      });
    });

    oReq.open('GET', dataURL);
    oReq.send();
  }
}

export default Blog;
