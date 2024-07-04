import React ,{useState}from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo} from '../features/todoSlice';

export const Searchbox = () => {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();

  const [text, setText] = useState("")

  function handleChange(e){
    const newtext = e.target.value
    setText(newtext);
  }

  function AddTodo(){
    dispatch(addTodo({text: text, date: new Date().toLocaleString()}));
    setText("")
  }

  return (
        <div className='Addtodo'>
          <input type='text' onChange={handleChange} value={text} placeholder='Add new tasks...'/>
          <button onClick={AddTodo} >Add</button>
        </div>
  )
}
