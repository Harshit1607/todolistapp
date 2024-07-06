import React ,{useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, completeTodo, fetchTodos } from '../features/todoSlice.js';


export const TodoItems = () => {
  const {todoItems, status, error, completedTodo} = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='pending-todo'>
          <h2>Pending Todos</h2>
            {
              todoItems.map((item, index) => {
                return (
                  <div className='todos'>
                    <input type='radio' checked={false} className='check-box'onChange={()=>{
                      console.log(completedTodo);
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
