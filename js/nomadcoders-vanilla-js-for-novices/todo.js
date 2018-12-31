const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList')

const TODOS_LS = 'toDos'

const toDos = []

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintTodo(text) {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  const span = document.createElement('span')
  const newId = toDos.length + 1
  delBtn.innerText = '❌'
  span.innerText = text
  li.appendChild(span)
  li.appendChild(delBtn)
  li.id = newId
  toDoList.appendChild(li)
  const todoObj = {
    text: text,
    id: newId
  }
  toDos.push(todoObj)
  saveTodos()
}

function handleSubmit(event) {
  event.preventDefault()
  const currentValue = toDoInput.value
  paintTodo(currentValue)
  toDoInput.value = ''
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS)
  if (loadedTodos !== null) {
    const parsedToDos = JSON.parse(loadedTodos)
    parsedToDos.forEach(function (toDo) {
      paintTodo(toDo.text)
    })
  }
}

function init() {
  loadToDos()
  toDoForm.addEventListener('submit', handleSubmit)
}

init()
