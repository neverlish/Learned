// 2 일렉트론 필수 모듈 알아보기 - Browser Window 모듈 알아보기 (2) 

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const first = new BrowserWindow({
    frame: false
  });

  first.loadURL(`file://${__dirname}/03.html`);

  const second = new BrowserWindow({
    titleBarStyle: 'hidden'
  });

  second.loadURL(`file://${__dirname}/03.html`);

  const third = new BrowserWindow({
    titleBarStyle: 'hidden-inset'
  });

  third.loadURL(`file://${__dirname}/03.html`);
});
