import React ,{useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo,  fetchTodos, completeTodo } from '../redux/actions.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SingleTodoItem } from './SingleTodoItem.jsx';


export const TodoItems = () => {
  const todoItems = useSelector(state=>state.todoReducer.todoItems);
  const userId = useSelector(state=>state.userReducer.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const tokenexp = (jwtDecode(token)).exp

    const now = Date.now() / 1000

    if(now>tokenexp){
      localStorage.setItem('token', '')
      localStorage.setItem('userId', '')
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, []);

  function handleComplete(id, userId){
    dispatch(completeTodo({id, userId}));
  }
  function handleDelete(id, userId){
    dispatch(deleteTodo({id, userId}))
  }

  return (
    <SortableContext strategy={verticalListSortingStrategy} items={todoItems}>
    <div className='pending-todo'>
          <h2>Pending Todos</h2>
            {
              todoItems.map((item) => {
                return(
                <SingleTodoItem key={item._id} item={item} 
                handleComplete={()=>handleComplete(item._id, userId)}
                handleDelete={() =>handleDelete(item._id, userId)} />
                )
              })
            }
        </div>
        </SortableContext>
  )
}
