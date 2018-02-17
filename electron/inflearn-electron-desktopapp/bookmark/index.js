const {app, BrowserWindow} = require('electron');

const data = [
  {
    type: 'home',
    url: 'https://github.com',
    title: '타이틀'
  },
  {
    type: 'github',
    url: 'https://github.com',
    title: '타이틀'
  },
  {
    type: 'home',
    url: 'https://github.com',
    title: '타이틀'
  },
];

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden',
    show: false
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => {
    win.show();
    win.webContents.send('update', data);
  });
});

