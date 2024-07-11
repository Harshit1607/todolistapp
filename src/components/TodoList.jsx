import React from 'react'
import { CompletedTodo } from './CompletedTodo.js';
import { Searchbox } from './Searchbox.js';
import { TodoItems } from './TodoItems.js';

export const TodoList = () => {
  return (
    <div className='TodoList' >
      <div className='Heading'><h1>TODOLIST</h1></div>
      <Searchbox />
      <div className='Left'>
        <TodoItems />
      </div>
      <CompletedTodo />
    </div>
  )
}
