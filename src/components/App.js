import React from 'react';
import { CompletedTodo } from './CompletedTodo.js';
import { Searchbox } from './Searchbox.js';
import { TodoItems } from './TodoItems.js';

function App() {
  return (
    <div className='App'>
      <div className='Heading'><h1>TODOLIST</h1></div>
      <Searchbox />
      <div className='Left'>
        <TodoItems />
      </div>
      <CompletedTodo />
    </div>
  );

}

export default App;
