// 2 일렉트론 필수 모듈 알아보기 - Tray 모듈 알아보기

const {app, BrowserWindow, Tray, Menu} = require('electron');

let win = null;
let tray = null;

const template = [
  {
    label: 'Item1'
  },
  {
    label: 'Item2',
    type: 'checkbox',
    checked: true
  },
  {
    type: 'separator'
  },
  {
    label: 'Item3',
    click: () => {
      console.log('Item3 clicked');
      app.quit();
    }
  },
]

app.on('ready', () => {
  console.log('ready');

  win = new BrowserWindow();

  tray = new Tray(`${__dirname}/icon.png`);

  /*
  tray.on('click', () => {
    console.log('click');
  });
  */

  tray.on('right-click', () => {
    console.log('right-click');
  });

  const menu = Menu.buildFromTemplate(template);

  tray.setContextMenu(menu);
});
