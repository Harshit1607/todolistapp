import { Fetch_todos, Add_todos, Delete_todos, Completed_todos } from "./actiontypes.js";

const initialState = {
  todoItems : [],
  completedtodo : []
}

function todoReducer(state=initialState, action){
  switch(action.type){
    case Fetch_todos:
            return{
              todoItems: action.payload.todoItems,
              completedtodo: action.payload.completedtodo
            }
    case Add_todos:
            return{
              // ...state,
              // todoItems: [...state.todoItems, action.payload]
              todoItems: action.payload.todoItems,
              completedtodo: action.payload.completedtodo
                  };

    case Delete_todos:
            return {
              // ...state,
              // todoItems: state.todoItems.filter((todo, index) => todo._id !== action.payload),
              todoItems: action.payload.todoItems,
              completedtodo: action.payload.completedtodo
                  };

    case Completed_todos:
            // const todoText = state.todoItems[action.payload].text;
            // const todoDate = state.todoItems[action.payload].date;
            // const todo ={
            //   text: todoText,
            //   date: todoDate
            // }
            return{
              // ...state,
              // todoItems: state.todoItems.filter((todo, index) => index !== action.payload),
              // completedtodo: [...state.completedtodo, todo]
              todoItems: action.payload.todoItems,
              completedtodo: action.payload.completedtodo
            }

     default:
            return state;
  }
}

export default todoReducer;