import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http;//localhost:3000';

const fetchTodos = createAsyncThunk('todos/fetchTodos', async ()=>{
  const result = await axios.get(API_URL);
  return result.data;
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
  // }
  extraReducers: (builder)=>{
    builder
          .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "suceeded";
            state.todoItems = action.payload;
          })
  }
})

export default todoSlice.reducer;
export const {addTodo, deleteTodo, completeTodo} = todoSlice.actions;