// 2 일렉트론 필수 모듈 알아보기 - dialog 모듈 알아보기

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/11.html`);
  win.webContents.openDevTools();
});
