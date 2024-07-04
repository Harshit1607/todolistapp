import React, { createContext, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, completeTodo } from '../features/todoSlice';

function App() {
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
    <div className='App'>
      <div className='Left'>
        <div className='Addtodo'>
          <input type='text' onChange={handleChange} value={text}/>
          <button onClick={AddTodo} >Add</button>
        </div>
        <div className='pending-todo'>
          <h2>pending todos</h2>
          
            {
              todos.todoItems.map((item, index) => {
                return (
                  <div className='todos'>
                    <input type='checkbox' onChange={()=>{
                      console.log(todos.completedTodo);
                      dispatch(completeTodo(index))}} />
                    <div className='info' key={index} id={index}>
                      <span>{item.text}</span>
                      <span>{item.date}</span>
                    </div>
                    <button onClick={()=>{dispatch(deleteTodo(index))}} >Delete</button>
                   </div>
                )
              })
            }
            
            
        </div>
      </div>
      <div className='Right'>
        <div className='completed-todo'>
        <h2>completed todos</h2>
        { todos.completedtodo?
          todos.completedtodo.map((item, index)=>{
            return(
              <div className='todos'>
                <div className='info'>
                  <p>{item.text}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            )
          }) : null
        }
        </div>
      </div>
    </div>
  );

}

export default App;
