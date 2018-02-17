const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden'
  });

  win.loadURL(`file://${__dirname}/index.html`);
});

