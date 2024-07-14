import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, deleteTodo, addTodo } from '../redux/actions.js';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SingleCompletedItem } from './SingleCompletedItem.jsx';

export const CompletedTodo = () => {
  const completedtodo = useSelector((state)=>state.todoReducer.completedtodo);
  const userId = useSelector(state=>state.userReducer.userId);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [completedtodo]);

  function handleDelete(id, userId){
    dispatch(deleteTodo({id, userId}))
  }

  return (
    <SortableContext strategy={verticalListSortingStrategy} items={completedtodo}>
    <div className='Right'>
        <div className='completed-todo'>
        <h2>Completed Todos</h2>
        { completedtodo?
          completedtodo.map((item)=>{
            return(
            <SingleCompletedItem key={item._id} item={item} 
            handleDelete={() =>handleDelete(item._id, userId)}/>
            )
          }) : null
        }
        </div>
      </div>
      </SortableContext>
  )
}
