import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../features/todoSlice.js';

export const CompletedTodo = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='Right'>
        <div className='completed-todo'>
        <h2>Completed Todos</h2>
        { todos.completedtodo?
          todos.completedtodo.map((item)=>{
            return(
              <div className='todos'>
                <div className='info'>
                  <span className='info-main'>Task- {item.text}</span>
                  <span className='info-date'>Date Completed- {item.date}</span>
                </div>
              </div>
            )
          }) : null
        }
        </div>
      </div>
  )
}
