// 2 일렉트론 필수 모듈 알아보기 - Browser Window 모듈 알아보기 (6) 

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const first = new BrowserWindow();
  first.loadURL(`file://${__dirname}/07.html`);

  const second = new BrowserWindow();
  second.loadURL(`file://${__dirname}/07.html`);
});
