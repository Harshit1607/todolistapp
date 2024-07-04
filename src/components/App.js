import React, { createContext, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, completeTodo } from '../features/todoSlice';
import { CompletedTodo } from './CompletedTodo';
import { Searchbox } from './Searchbox';
import { TodoItems } from './TodoItems';

function App() {
  

  return (
    <div className='App'>
      <div className='Left'>
        <Searchbox />
        <TodoItems />
      </div>
      <CompletedTodo />
    </div>
  );

}

export default App;
