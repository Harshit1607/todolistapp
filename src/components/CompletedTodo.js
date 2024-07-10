import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, deleteTodo } from '../redux/actions.js';

export const CompletedTodo = () => {
  const {completedtodo} = useSelector((state)=>state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='Right'>
        <div className='completed-todo'>
        <h2>Completed Todos</h2>
        { completedtodo?
          completedtodo.map((item)=>{
            return(
              <div className='todos' onClick={()=>{dispatch(deleteTodo(item._id))}}>
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
