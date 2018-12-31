const title = document.querySelector('#title')

const BASE_COLOR = 'rgb(52, 73, 94)'
const OTHER_COLOR = '#7f8c8d'

function handleClick() {
  const currentColor = title.style.color
  if (currentColor === BASE_COLOR) {
    title.style.color = OTHER_COLOR
  } else {
    title.style.color = BASE_COLOR
  }
}

function init() {
  title.style.color = BASE_COLOR
  title.addEventListener('click', handleClick)
}

init()

function handleOffline() {
  console.log('Bye bye')
}

function handleOnline() {
  console.log('Welcome back')
}

window.addEventListener('offline', handleOffline)
window.addEventListener('online', handleOnline)
