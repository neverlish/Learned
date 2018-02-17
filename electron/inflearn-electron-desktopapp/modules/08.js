// 2 일렉트론 필수 모듈 알아보기 - Menu 모듈 알아보기

const {app, BrowserWindow, Menu} = require('electron');

const template = [
  {
    label: 'First',
    submenu: [
      {
        label: 'First-sub1',
        click: () => {
          console.log('First-sub1 click');
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Second',
    submenu: [
      {
        label: 'Second-sub1'
      },
      {
        label: 'Second-sub2'
      },
      {
        type: 'separator'
      },
      {
        label: 'Second-sub3',
        click() {
          console.log('Second-sub3 click');
        }
      }
    ]
  }
];

app.on('ready', () => {
  console.log('ready');

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  console.log(Menu.getApplicationMenu());

  const win = new BrowserWindow();
});
