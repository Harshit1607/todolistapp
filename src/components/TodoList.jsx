import React from 'react'
import { CompletedTodo } from './CompletedTodo.js';
import { Searchbox } from './Searchbox.js';
import { TodoItems } from './TodoItems.js';
import { useNavigate } from 'react-router-dom';

export const TodoList = () => {
  const navigate = useNavigate()
  return (
    <div className='TodoList' >
      <div className='Heading'><h1>TODOLIST</h1></div>
      <Searchbox />
      <div className='Left'>
        <TodoItems />
      </div>
      <CompletedTodo />
      <button className='logout' onClick={()=>{localStorage.setItem('token', '')
                                              localStorage.setItem('userId', '')
                            navigate('/login')
      }}>Log out</button>
    </div>
  )
}
