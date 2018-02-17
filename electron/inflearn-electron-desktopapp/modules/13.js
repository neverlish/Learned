// 2 일렉트론 필수 모듈 알아보기 - remote, shell, process 모듈 알아보기

const {app, BrowserWindow, ipcMain, shell} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/13.html`);
  win.webContents.openDevTools();

  console.log(win.id);

  /*
  setTimeout(() => {
    shell.openExternal('https://www.protopie.io');
  }, 3000)
  */
  console.log(process.versions);
  console.log(process.platform);
  console.log(process.type);
});
