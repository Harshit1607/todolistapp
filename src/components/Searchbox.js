import React ,{useState, useEffect}from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, fetchTodos } from '../features/todoSlice.js';
import { TodoItems } from './TodoItems.js';

export const Searchbox = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const [text, setText] = useState("")

  function handleChange(e){
    const newtext = e.target.value
    setText(newtext);
  }

  function AddTodo(){
    dispatch(addTodo(text));
    setText("")
  }

  return (
        <div className='Addtodo'>
          <input type='text' onChange={handleChange} value={text} placeholder='Add new tasks...'/>
          <button onClick={AddTodo} >Add</button>
        </div>
  )
}
