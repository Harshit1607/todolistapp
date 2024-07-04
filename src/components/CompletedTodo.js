import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, completeTodo } from '../features/todoSlice';

export const CompletedTodo = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  return (
    <div className='Right'>
        <div className='completed-todo'>
        <h2>completed todos</h2>
        { todos.completedtodo?
          todos.completedtodo.map((item, index)=>{
            return(
              <div className='todos'>
                <div className='info'>
                  <p>{item.text}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            )
          }) : null
        }
        </div>
      </div>
  )
}
