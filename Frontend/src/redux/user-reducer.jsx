import { User_login, User_signup } from "./actiontypes.js";

const initialState = {
  user: '',
  token: '',
  message: '',
  userId: localStorage.getItem('userId')? localStorage.getItem('userId'): '',
}

function userReducer(state=initialState, action){
  console.log(state)
  switch(action.type){
    case User_login:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userId', action.payload.existingUser._id)
      return{
        ...state,

        user: action.payload.existingUser.user,
        token: action.payload.token,
        message: action.payload.message,
        userId: action.payload.existingUser._id
      }
    case User_signup:
      localStorage.setItem('token', action.payload.token)
      return{
        ...state,
        user: action.payload.newUser.user,
        token: action.payload.token,
        message: action.payload.message,
        userId: action.payload.newUser._id
      }
    default:  return state
  }
}

export default userReducer;