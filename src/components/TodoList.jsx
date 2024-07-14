import React from 'react'
import { CompletedTodo } from './CompletedTodo.js';
import { Searchbox } from './Searchbox.js';
import { TodoItems } from './TodoItems.js';
import { useNavigate } from 'react-router-dom';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, completeTodo, deleteTodo } from '../redux/actions.js';

export const TodoList = () => {
  const navigate = useNavigate()
  const pendingTodos = useSelector(state => state.todoReducer.todoItems);
  const completedTodos = useSelector(state => state.todoReducer.completedtodo);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.userId);

  function handleDragend(event){
    const {active, over} = event;
    if(!over){
      return
    }
    const activeId = active.id;
    const overId = over.id;
    console.log(overId)

    const activeItem = pendingTodos.find(todo => todo._id === activeId) || completedTodos.find(todo => todo._id === activeId);

    if(activeId !== overId){
      if(pendingTodos.some(todo => todo._id === activeId) && completedTodos.some(todo => todo._id === overId)){
        dispatch(completeTodo({id: activeId, userId}))
      } else if(completedTodos.some(todo => todo._id === activeId) && pendingTodos.some(todo => todo._id === overId)){
        dispatch(deleteTodo({id: activeId, userId}))
        dispatch(addTodo({text: activeItem.text, userId}))
      }
    }
  };


  return (
    <div className='TodoList' >
      <div className='Heading'><h1>TODOLIST</h1></div>
      <Searchbox />
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragend}>
      <div className='Left'>
        <TodoItems />
      </div>
      <CompletedTodo />
      </DndContext>
      <button className='logout' onClick={()=>{localStorage.setItem('token', '')
                                              localStorage.setItem('userId', '')
                            navigate('/login')
      }}>Log out</button>
    </div>
  )
}
