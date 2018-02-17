// 2 일렉트론 필수 모듈 알아보기 - Browser Window 모듈 알아보기 (1) 

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600
  });

  mainWindow.loadURL('https://github.com');

  const secondWindow = new BrowserWindow({
    width: 300,
    height: 300,
    x: 0,
    y: 0,
    minWidth: 200,
    minHeight: 200,
    maxWidth: 500,
    maxHeight: 500,
    movable: false,
    title: 'second'
  });

  secondWindow.loadURL(`file://${__dirname}/02.html`)
});
