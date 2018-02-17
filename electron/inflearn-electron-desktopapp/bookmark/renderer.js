const {ipcRenderer, clipboard, shell} = require('electron');
let type = 'home';
let data = [];

const btnHome = document.querySelector('#btn-home');
const btnGithub = document.querySelector('#btn-github');

btnHome.classList.add('active');
btnGithub.classList.remove('active');

ipcRenderer.on('update', (event, _data) => {
  data = _data;
  update();
});

btnHome.addEventListener('click', () => {
  if (type === 'home') {
    return;
  }
  btnHome.classList.add('active');
  btnGithub.classList.remove('active');
  type = 'home';
  update();
});

btnGithub.addEventListener('click', () => {
  if (type === 'github') {
    return;
  }
  btnGithub.classList.add('active');
  btnHome.classList.remove('active');
  type = 'github';  
  update();    
});

function update() {
  const items = data.filter((item, index) => {
    item.removeId = index;
    return item.type === type
  });
  
  const htmls = items.map(item => {
    return `
      <li class="list-group-item">
        <div class="media-body">
          <strong><a href='#'>${item.url}</a></strong>
          <p>
            ${item.title}
            <span class="icon icon-trash pull-right"></span>
          </p>
        </div>
      </li>
    `;
  });
  const html = htmls.join('');
  document.querySelector('#data').innerHTML = html;
  const removeDoms = document.querySelectorAll('.icon-trash');
  removeDoms.forEach((removeDom, index) => {
    removeDom.addEventListener('click', () => {
      ipcRenderer.send('remove', items[index].removeId);
    });
  });
  const openDoms = document.querySelectorAll('.list-group-item a');
  openDoms.forEach(openDom => {
    openDom.addEventListener('click', (e) => {
      shell.openExternal(e.target.innerHTML);
    });
  });
}

document.addEventListener('paste', () => {
  const text = clipboard.readText();
  const item = {
    type: type,
    url: text
  };
  ipcRenderer.send('paste', item);
});
