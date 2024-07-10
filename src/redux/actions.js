import { Fetch_todos, Add_todos, Delete_todos, Completed_todos } from "./actiontypes.js";
import axios from 'axios'

const API_URL='http://localhost:5000/';

export const fetchTodos = () => async (dispatch)=>{
  const result = await axios.get(API_URL);
  dispatch({ type: Fetch_todos, payload: result.data });
}

export const addTodo = (text)=>  async (dispatch)=>{
  const result = await axios.post(API_URL, {text});
  dispatch({ type: Add_todos, payload: result.data });
}

export const deleteTodo = (id)=> async (dispatch)=>{
  await axios.delete(`${API_URL}${id}`);
  dispatch({type: Delete_todos, payload: id })
}

export const completeTodo = (id)=> async (dispatch)=>{
  await axios.patch(`${API_URL}${id}`);
  dispatch({type: Completed_todos})
}