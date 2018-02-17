const {app, BrowserWindow, ipcMain, dialog, Tray, Menu, clipboard} = require('electron');
const request = require('superagent');
const getTitle = require('get-title');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, './data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH).toString());

let win = null;
let tray = null;

const template = [
  {
    label: 'Open',
    click: () => {
      win.show();
    }
  },
  {
    label: 'Save',
    submenu: [
      {
        label: 'Home',
        click: () => {
          const item = {
            type: 'home',
            url: clipboard.readText()
          };
          save(item);
        }
      },
      {
        label: 'Github',
        click: () => {
          const item = {
            type: 'github',
            url: clipboard.readText()
          };
          save(item);
        }
      }
    ]
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click: () => {
      app.quit();
    }
  },
]

const context = [
  {
    label: app.getName(),
    submenu: [
      {role: 'paste'},
      {type: 'separator'},
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]
  }
];

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(context));
  const menu = Menu.buildFromTemplate(template);
  tray = new Tray(path.join(__dirname, './icon.png'));
  tray.setContextMenu(menu);
  if (process.platform === 'darwin') {
    tray.on('right-click', () => {
      toggle();
    });
  } else {
    tray.on('click', () => {
      toggle();
    });
  }
  
  const bounds = tray.getBounds();
  win = new BrowserWindow({
    width: 400,
    height: 400,
    x: Math.round(bounds.x + (bounds.width / 2) - 200),
    y: (process.platform === 'darwin') ? bounds.y + (bounds.height / 2) + 10 : bounds.y - 400 + 10,
    acceptFirstMouse: true,
    show: false,
    resizable: false,
    movable: false,
    frame: false
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => {
    win.webContents.send('update', data);
  });

  if (process.platform === 'darwin') {
    win.on('blur', () => {
      win.hide();
    });
  }

  ipcMain.on('paste', (event, item) => {
    save(item);
  })

  ipcMain.on('remove', (event, removeId) => {
    data.splice(removeId, 1);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
    win.webContents.send('update', data);
  });
});

function toggle() {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
}

function save(item) {
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
}
