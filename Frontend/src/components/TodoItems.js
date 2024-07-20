import React ,{useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo,  fetchTodos, completeTodo } from '../redux/actions.js';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SingleTodoItem } from './SingleTodoItem.jsx';


export const TodoItems = () => {
  const todoItems = useSelector(state=>state.todoReducer.todoItems);
  const userId = useSelector(state=>state.userReducer.userId);
  const dispatch = useDispatch();

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
    <SortableContext  items={todoItems}>
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
