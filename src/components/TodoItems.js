import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, completeTodo } from '../features/todoSlice';

export const TodoItems = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  return (
    <div className='pending-todo'>
          <h2>pending todos</h2>
            {
              todos.todoItems.map((item, index) => {
                return (
                  <div className='todos'>
                    <input type='checkbox' onChange={()=>{
                      console.log(todos.completedTodo);
                      dispatch(completeTodo(index))}} />
                    <div className='info' key={index} id={index}>
                      <span>{item.text}</span>
                      <span>{item.date}</span>
                    </div>
                    <button onClick={()=>{dispatch(deleteTodo(index))}} >Delete</button>
                   </div>
                )
              })
            }
            
            
        </div>
  )
}
