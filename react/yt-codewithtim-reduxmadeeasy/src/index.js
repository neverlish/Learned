import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState = {
  sendingRequest: false,
  requestReceived: false,
  user: {
    name: '',
    email: '',
    gender: ''
  },
  status: '',
  statusClass: ''
}

// REDUCER 
function userReducer(state=initialState, action) {
  const user = {
    name: '',
    email: '',
    gender: ''
  }
  switch (action.type) {
    case 'GET_USER':
      return {...state, sendingRequest: true, status: 'Pending...', statusClass: 'pending'}
      break
    case 'USER_RECEIVED':
      user.name = `${action.payload[0].name.first} ${action.payload[0].name.last}`
      user.email = action.payload[0].email
      user.gender = action.payload[0].gender
      return {...state, sendingRequest: false, user, status: 'User Received', statusClass: 'success'}
      break
    case 'ERROR':
      return {...state, sendingRequest: false, status: `${action.payload.message}`, statusClass: 'error'}
      break
    default:
      return state
  }
}

// STORE
const store = createStore(userReducer, applyMiddleware(logger(), thunk))
const nameEl = document.getElementById('name')
const emailEl = document.getElementById('email')
const genderEl = document.getElementById('gender')
const statusEl = document.getElementById('status')

function render() {
  var state = store.getState()
  nameEl.innerHTML = state.user.name
  emailEl.innerHTML = state.user.email
  genderEl.innerHTML = state.user.gender
  statusEl.innerHTML = state.status
  statusEl.className = state.statusClass
}

render()
store.subscribe(render)

// ACTIONS
document.getElementById('getUser')
  .addEventListener('click', function() {
    store.dispatch(dispatch => {
      // ASYNC ACTION
      // dispatch action
      dispatch({type: 'GET_USER'})
      // do the xhr request
      axios.get('https://randomuser.me/api/')
      // handle response
      // success
        .then(response => {
          dispatch({type: 'USER_RECEIVED', payload: response.data.results})
        })
      // error
        .catch(error => {
          dispatch({type: 'ERROR', payload: error})
        })
      dispatch({type: 'AFTER ASYNC ACTION'})
    })
  })
