import { User_login, User_signup } from "./actiontypes.js";

const initialState = {
  user: '',
  token: '',
  message: ''
}

function userReducer(state=initialState, action){
  switch(action.type){
    case User_login:
      localStorage.setItem('token', action.payload.token)
      return{
        user: action.payload.existingUser.user,
        token: action.payload.token,
        message: action.payload.message
      }
    case User_signup:
      localStorage.setItem('token', action.payload.token)
      return{
        user: action.payload.newUser.user,
        token: action.payload.token,
        message: action.payload.message
      }
    default:  return{
      ...state
    } 
  }
}

export default userReducer;