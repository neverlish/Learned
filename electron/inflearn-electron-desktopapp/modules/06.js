// 2 일렉트론 필수 모듈 알아보기 - Browser Window 모듈 알아보기 (5) 

const {app, BrowserWindow} = require('electron');

let win = null;

app.on('ready', () => {
  console.log('ready');

  win = new BrowserWindow({
    show: false
  });

  win.loadURL(`file://${__dirname}/06.html`)

  win.on('ready-to-show', () => {
    console.log('ready-to-show');
    win.show();
  });

  win.on('show', () => {
    console.log('show');
  });

  win.on('hide', () => {
    console.log('hide');
  });

  win.on('close', () => {
    console.log('close');
  });

  win.on('focus', () => {
    console.log('focus');
  });

  win.on('blur', () => {
    console.log('blur');
  });

  win.on('move', () => {
    console.log('move');
  });

  win.on('moved', () => {
    console.log('moved');
  });
});

app.on('activate', (event, hasVisibleWindows) => {
  console.log('activate');
  if (!hasVisibleWindows) {
    win.show();
  }
})
