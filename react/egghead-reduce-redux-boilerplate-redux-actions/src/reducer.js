import {getTodos, createTodo, updateTodo, destroyTodo} from './lib/todoServices'

const initState = {
  todos: [],
  currentTodo: '',
  isLoading: true,
  message: ''
}

const UPDATE_CURRENT = 'UPDATE_CURRENT'
const ADD_TODO = 'ADD_TODO'
const LOAD_TODOS = 'LOAD_TODOS'
const REPLACE_TODO = 'REPLACE_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

export const updateCurrent = (val) => ({type:UPDATE_CURRENT, payload: val})
export const loadTodos = (todos) => ({type: LOAD_TODOS, payload: todos})
export const addTodo = (todo) => ({type: ADD_TODO, payload: todo})
export const replaceTodo = (todo) => ({type: REPLACE_TODO, payload: todo })
export const removeTodo = (id) => ({type: REMOVE_TODO, payload: id})
export const showLoader = () => ({type: SHOW_LOADER, payload: true})
export const hideLoader = () => ({type: HIDE_LOADER, payload: false})

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showLoader())
    getTodos()
      .then(todos => {
        dispatch(loadTodos(todos))
        dispatch(hideLoader())
      })
  }
}

export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showLoader())
    createTodo(name)
      .then(res => {
        dispatch(addTodo(res))
        dispatch(hideLoader())
      })
  }
}

export const toggleTodo = (id) => {
  return (dispatch, getState) => {
    dispatch(showLoader())
    const {todos} = getState()
    const todo = todos.find(t => t.id === id)
    const toggled = {...todo, isComplete: !todo.isComplete}
    updateTodo(toggled)
      .then(res => {
        dispatch(replaceTodo(res))
        dispatch(hideLoader())
      })
  }
}

export const deleteTodo = (id) => {
  return (dispatch) => {
    dispatch(showLoader())
    destroyTodo(id)
      .then(() => {
        dispatch(removeTodo(id))
        dispatch(hideLoader())
      })
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)
    case 'completed':
      return todos.filter(t => t.isComplete)
    default:
      return todos
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)}
    case LOAD_TODOS:
      return {...state, todos: action.payload}
    case UPDATE_CURRENT:
      return {...state, currentTodo: action.payload}
    case REPLACE_TODO:
      return {...state,
        todos: state.todos
          .map(t => t.id === action.payload.id ? action.payload : t)
      }
    case REMOVE_TODO:
      return {...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      }
    case SHOW_LOADER:
    case HIDE_LOADER:
      return {...state, isLoading: action.payload}
    default:
      return state
  }
}
