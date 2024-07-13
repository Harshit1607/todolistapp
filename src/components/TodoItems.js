import React ,{useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo,  fetchTodos, completeTodo } from '../redux/actions.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export const TodoItems = () => {
  const todoItems = useSelector(state=>state.todoReducer.todoItems);
  const userId = useSelector(state=>state.userReducer.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const tokenexp = (jwtDecode(token)).exp

  const now = Date.now() / 1000

  if(now>tokenexp){
    localStorage.setItem('token', '')
    localStorage.setItem('userId', '')
    navigate('/login')
  }

  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, []);

  return (
    <div className='pending-todo' onDrop={(e)=>{
      dispatch(fetchTodos(userId))}}>
          <h2>Pending Todos</h2>
            {
              todoItems.map((item, index) => {
                return (
                  <div className='todos' key={item._id} draggable 
                    onDragEnd={(e)=>{
                    dispatch(completeTodo({id: item._id, userId}))}}> 
                    <input type='radio' checked={false} className='check-box'onChange={()=>{
                      dispatch(completeTodo({id: item._id, userId}))}} />
                    <div className='info' key={item._id} id={item._id}>
                      <span className='info-main' >Task- {item.text}</span>
                      <span className='info-date'>Date Added- {item.date}</span>
                    </div>
                    <button onClick={()=>{dispatch(deleteTodo({id: item._id, userId}))}} >Del</button>
                   </div>
                )
              })
            }
            
            
        </div>
  )
}
