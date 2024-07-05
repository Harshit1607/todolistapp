import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, completeTodo } from '../features/todoSlice';


export const TodoItems = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  return (
    <div className='pending-todo'>
          <h2>Pending Todos</h2>
            {
              todos.todoItems.map((item, index) => {
                return (
                  <div className='todos'>
                    <input type='radio' checked={false} className='check-box'onChange={()=>{
                      console.log(todos.completedTodo);
                      dispatch(completeTodo(index))}} />
                    <div className='info' key={index} id={index}>
                      <span className='info-main' >Task- {item.text}</span>
                      <span className='info-date'>Date Added- {item.date}</span>
                    </div>
                    <button onClick={()=>{dispatch(deleteTodo(index))}} >Del</button>
                   </div>
                )
              })
            }
            
            
        </div>
  )
}
