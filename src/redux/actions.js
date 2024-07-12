import { Fetch_todos, Add_todos, Delete_todos, Completed_todos, User_login, User_signup } from "./actiontypes.js";
import axios from 'axios'

const API_URL='http://localhost:5000/';

export const fetchTodos = () => async (dispatch)=>{
  try{
  const result = await axios.get(API_URL,{headers: {authorization: localStorage.getItem('token')} } );
  dispatch({ type: Fetch_todos, payload: result.data });
  } catch (err){
    alert(err.message);
  }
}

export const addTodo = (text)=>  async (dispatch)=>{
  try{
  const result = await axios.post(API_URL, {text});
  dispatch({ type: Add_todos, payload: result.data });
  } catch (err){
    alert(err.message);
  }
}

export const deleteTodo = (id)=> async (dispatch)=>{
  try{
  const result = await axios.delete(`${API_URL}${id}`);
  dispatch({type: Delete_todos, payload: result.data })
} catch (err){
  alert(err.message);
}
}

export const completeTodo = (id)=> async (dispatch)=>{
  try{
  const result = await axios.patch(`${API_URL}${id}`);
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