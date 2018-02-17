// 2 일렉트론 필수 모듈 알아보기 - ipcMain, ipcRenderer 모듈 알아보기

const {app, BrowserWindow, ipcMain} = require('electron');

app.on('ready', () => {
  console.log('ready');

  const win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/12.html`);
  win.webContents.openDevTools();

  ipcMain.on('send_async_channel', (event, message) => {
    console.log(message);
    // event.sender.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
    win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
  });

  ipcMain.on('send_sync_channel', (event, message) => {
    console.log(message);
    event.returnValue = '이것은 메인프로세스에서 보낸 동기 대답입니다.';
  });

  setInterval(() => {
    win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
  }, 3000);
});
