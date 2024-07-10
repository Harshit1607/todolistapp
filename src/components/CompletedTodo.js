import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, deleteTodo, addTodo } from '../redux/actions.js';

export const CompletedTodo = () => {
  const completedtodo = useSelector((state)=>state.completedtodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='Right'>
        <div className='completed-todo' onDrop={()=>{
          console.log(2)
          dispatch(fetchTodos())}}>
        <h2>Completed Todos</h2>
        { completedtodo?
          completedtodo.map((item)=>{
            return(
              <div className='todos' key={item._id} draggable onDragEnd={()=>{
                dispatch(addTodo(item.text))
                dispatch(deleteTodo(item._id))}}>
                <div className='info'>
                  <span className='info-main'>Task- {item.text}</span>
                  <span className='info-date'>Date Completed- {item.date}</span>
                </div>
                <button onClick={()=>{dispatch(deleteTodo(item._id))}}>Del</button>
              </div>
            )
          }) : null
        }
        </div>
      </div>
  )
}
