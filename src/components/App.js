import React from 'react';
import { CompletedTodo } from './CompletedTodo';
import { Searchbox } from './Searchbox';
import { TodoItems } from './TodoItems';

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
