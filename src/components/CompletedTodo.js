import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const CompletedTodo = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  return (
    <div className='Right'>
        <div className='completed-todo'>
        <h2>Completed Todos</h2>
        { todos.completedtodo?
          todos.completedtodo.map((item, index)=>{
            return(
              <div className='todos'>
                <div className='info'>
                  <span className='info-main'>{item.text}</span>
                  <span className='info-date'>{item.date}</span>
                </div>
              </div>
            )
          }) : null
        }
        </div>
      </div>
  )
}
