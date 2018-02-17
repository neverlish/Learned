// 2 일렉트론 필수 모듈 알아보기 - Browser Window 모듈 알아보기 (4) 

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const parent = new BrowserWindow();

  setTimeout(() => {
    const child = new BrowserWindow({
      width: 300,
      height: 300,
      parent: parent,
      modal: true
    });

    child.loadURL(`file://${__dirname}/05.html`)
  }, 3000)
  
});
