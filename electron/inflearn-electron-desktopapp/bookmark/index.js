const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const request = require('superagent');
const getTitle = require('get-title');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, './data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH).toString());

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

  ipcMain.on('paste', (event, item) => {
    if (item.url.indexOf('http://') > -1 || item.url.indexOf('https://') > -1) {
      const type = item.type;
      const url = item.url;
      request.get(url)
        .end((err, response) => {
          const contents = response.res.text;
          getTitle(contents).then(title => {
            data.push({type, url, title});
            fs.writeFileSync(DATA_PATH, JSON.stringify(data));
            win.webContents.send('update', data);
          });
        })
    } else {
      dialog.showErrorBox('경고', '유효한 url이 아닙니다.');
    }
  })

  ipcMain.on('remove', (event, removeId) => {
    data.splice(removeId, 1);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
    win.webContents.send('update', data);
  });
});

