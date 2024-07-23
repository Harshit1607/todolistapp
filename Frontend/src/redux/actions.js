import { Fetch_todos, Add_todos, Delete_todos, Completed_todos, User_login, User_signup, User_logout } from "./actiontypes.js";
import axios from 'axios'

const API_URL=process.env.REACT_APP_API_URL;

export const fetchTodos = (userId) => async (dispatch)=>{
  try{
    const result = await axios.get(API_URL,{ 
      params: {
        userId: userId
      },
      headers: {
        authorization: localStorage.getItem('token'), 
      },});
    dispatch({ type: Fetch_todos, payload: result.data });
  } catch (err){
    alert(err.message);
  }
}

export const addTodo = ({text, userId})=>  async (dispatch)=>{
  try{
  const result = await axios.post(API_URL, {text, userId});
  dispatch({ type: Add_todos, payload: result.data });
  } catch (err){
    alert(err.message);
  }
}

export const deleteTodo = ({id, userId})=> async (dispatch)=>{
  try{
  const result = await axios.delete(`${API_URL}${id}`, {data: {userId: userId}});
  dispatch({type: Delete_todos, payload: result.data })
} catch (err){
  alert(err.message);
}
}

export const completeTodo = ({id, userId})=> async (dispatch)=>{
  try{
  const result = await axios.put(`${API_URL}${id}`, {userId});
  dispatch({type: Completed_todos, payload: result.data })
  } catch (err){
    alert(err.message);
  }
}

export const signup = ({user, email, pass})=> async (dispatch)=>{
  try{
  const result = await axios.post(`${API_URL}signup`, {user, email, pass});
  console.log(result.data)
  dispatch({type: User_signup, payload: result.data})}
  catch (err){
    alert(err.message)
  }
}

export const login = ({user, email, pass})=> async (dispatch)=>{
  try{
  const result = await axios.post(`${API_URL}login`, {user, email, pass});
  console.log(result.data)
  dispatch({type: User_login, payload: result.data})}
  catch (err){
    alert(err.message)
  }
}

export const logout = ()=>(dispatch)=>{
  dispatch({type: User_logout})
}