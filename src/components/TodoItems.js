import React ,{useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo,  fetchTodos, completeTodo } from '../redux/actions.js';


export const TodoItems = () => {
  const todoItems = useSelector(state=>state.todoReducer.todoItems);
  console.log(todoItems)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className='pending-todo' onDrop={(e)=>{
      dispatch(fetchTodos())}}>
          <h2>Pending Todos</h2>
            {
              todoItems.map((item, index) => {
                return (
                  <div className='todos' key={item._id} draggable 
                    onDragEnd={(e)=>{
                    dispatch(completeTodo(item._id))}}> 
                    <input type='radio' checked={false} className='check-box'onChange={()=>{
                      dispatch(completeTodo(item._id))}} />
                    <div className='info' key={item._id} id={item._id}>
                      <span className='info-main' >Task- {item.text}</span>
                      <span className='info-date'>Date Added- {item.date}</span>
                    </div>
                    <button onClick={()=>{dispatch(deleteTodo(item._id))}} >Del</button>
                   </div>
                )
              })
            }
            
            
        </div>
  )
}
