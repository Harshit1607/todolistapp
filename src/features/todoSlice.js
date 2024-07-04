import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  todoItems : [],
  completedtodo : []
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers : {
    addTodo: (state, action)=>{
      return{
        ...state,
        todoItems: [...state.todoItems, action.payload]
      }
    },
    deleteTodo: (state, action) =>{
      return {
        ...state,
        todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
      };
    },
    completeTodo: (state, action) => {
        const todoText = state.todoItems[action.payload].text;
        const todoDate = state.todoItems[action.payload].date;
        const todo ={
          text: todoText,
          date: todoDate
        }
        console.log(todo);
        return{
          ...state,
          todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
          completedtodo: [...state.completedtodo, todo]
        }
    }
  }
})

export default todoSlice.reducer;
export const {addTodo, deleteTodo, completeTodo} = todoSlice.actions;