// 2 일렉트론 필수 모듈 알아보기 - app 모듈 알아보기

const {app, BrowserWindow} = require('electron');

console.log('start');

app.on('will-finish-launching', () => {
  console.log('will-finish-launching');
});

app.on('ready', launchInfo => {
  console.log(`ready: ${JSON.stringify(launchInfo)}`);

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600
  });
});

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  app.quit();
})

app.on('before-quit', event => {
  // event.preventDefault();
  console.log('before-quit');
});

app.on('will-quit', event => {
  // event.preventDefault();
  console.log('will-quit');
});

app.on('quit', (event, exitCode) => {
  console.log(`quit: ${exitCode}`);
});

app.on('activate', (event, hasVisibleWindows) => {
  console.log(`activate: ${hasVisibleWindows}`);
});
