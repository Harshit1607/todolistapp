import { User_login, User_signup, User_logout } from "./actiontypes.js";

const initialState = {
  user: localStorage.getItem('user')? localStorage.getItem('user') : null,
  token: localStorage.getItem('token')? localStorage.getItem('token') : null,
  userId: localStorage.getItem('userId')? localStorage.getItem('userId') : null,
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
    case User_logout:
      return{
        user: null,
        token: null,
        userId: null
      }
    default:  return state
  }
}

export default userReducer;
