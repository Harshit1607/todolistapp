import React ,{useEffect, useState} from 'react'
import { jwtDecode } from 'jwt-decode';
import { CompletedTodo } from './CompletedTodo.js';
import { Searchbox } from './Searchbox.js';
import { TodoItems } from './TodoItems.js';
import { useNavigate } from 'react-router-dom';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, completeTodo, deleteTodo } from '../redux/actions.js';

export const TodoList = () => {
  const navigate = useNavigate()
  const pendingTodos = useSelector(state => state.todoReducer.todoItems);
  const completedTodos = useSelector(state => state.todoReducer.completedtodo);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.userId);

  const [activeId, setActiveId] = useState()

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

  function handleDragStart(event){
    setActiveId(event.active.id)
  }
  console.log(activeId)

  function handleDragend(event){
    const {active, over} = event;
    if(!over){
      return
    }
    const activeId = active.id;
    const overId = over.id;

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
      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart}  onDragEnd={handleDragend}>
      <div className='Left'>
        <TodoItems />
      </div>
      <div className='Right'>
      <CompletedTodo />
      </div>
      <DragOverlay>
      {activeId ? (
            <div className='todos' >
              <div className='info'>
              <span className='info-main'>Task- {pendingTodos.find(todo => todo._id === activeId)?.text || completedTodos.find(todo => todo._id === activeId)?.text}</span>
              <span className='info-date'>Date Completed- {pendingTodos.find(todo => todo._id === activeId)?.date || completedTodos.find(todo => todo._id === activeId)?.date}</span>
            </div>
            </div>
          ) : null}
      </DragOverlay>
      </DndContext>
      <button className='logout' onClick={()=>{localStorage.setItem('token', '')
                                              localStorage.setItem('userId', '')
                            navigate('/login')
      }}>Log out</button>
    </div>
  )
}
