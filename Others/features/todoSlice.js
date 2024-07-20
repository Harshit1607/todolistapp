import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://localhost:5000/';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ()=>{
  const result = await axios.get(API_URL);
  console.log(result.data)
  return result.data;
  
})

export const addTodo = createAsyncThunk('todos/addTodo', async (text)=>{
  console.log(text);
  const result = await axios.post(API_URL, {text});
  return result.data;
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id)=>{
  await axios.delete(`${API_URL}${id}`);
  return id;
})

export const completeTodo = createAsyncThunk('todos/completeTodo', async (id)=>{
  await axios.patch(`${API_URL}${id}`);
  return id;
})

const initialState = {
  todoItems : [],
  completedtodo : []
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  // reducers : {
  //   addTodo: (state, action)=>{
  //     return{
  //       ...state,
  //       todoItems: [...state.todoItems, action.payload]
  //     }
  //   },
  //   deleteTodo: (state, action) =>{
  //     return {
  //       ...state,
  //       todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
  //     };
  //   },
  //   completeTodo: (state, action) => {
  //       const todoText = state.todoItems[action.payload].text;
  //       const todoDate = state.todoItems[action.payload].date;
  //       const todo ={
  //         text: todoText,
  //         date: todoDate
  //       }
  //       return{
  //         ...state,
  //         todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
  //         completedtodo: [...state.completedtodo, todo]
  //       }
  //   }
  // },
  extraReducers: (builder)=>{
    builder
          .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "suceeded";
            state.todoItems = action.payload.todos;
            state.completedtodo = action.payload.completed
          })
          .addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(addTodo.fulfilled, (state, action) => {
            return{
                    ...state,
                    todoItems: [...state.todoItems, action.payload]
                  }
          })
          .addCase(deleteTodo.fulfilled, (state, action) => {
            return {
                    ...state,
                    todoItems: state.todoItems.filter((todo, index) => todo._id !== action.payload),
                  };
          })
          .addCase(completeTodo.fulfilled, (state, action) => {
            const todoText = state.todoItems[action.payload].text;
            const todoDate = state.todoItems[action.payload].date;
            const todo ={
              text: todoText,
              date: todoDate
            }
            return{
              ...state,
              todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
              completedtodo: [...state.completedtodo, todo]
            }
          })
  }
})

export default todoSlice.reducer;