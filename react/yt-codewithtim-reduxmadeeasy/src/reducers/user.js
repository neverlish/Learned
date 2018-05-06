// Promise
// pending 
// fulfilled
// rejected
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
    case 'FETCH_USER_PENDING':
      return {...state, sendingRequest: true, status: 'Pending...', statusClass: 'pending'}
      break
    case 'FETCH_USER_FULFILLED':
      user.name = `${action.payload.data.results[0].name.first} ${action.payload.data.results[0].name.last}`
      user.email = action.payload.data.results[0].email
      user.gender = action.payload.data.results[0].gender
      return {...state, sendingRequest: false, user, status: 'User Received', statusClass: 'success'}
      break
    case 'FETCH_USER_REJECTED':
      return {...state, sendingRequest: false, status: `${action.payload.message}`, statusClass: 'error'}
      break
    default:
      return state
  }
}

export default userReducer
