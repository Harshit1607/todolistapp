import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { signup } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[user, setUser]=useState("");
  const[email, setEmail]=useState("");
  const[pass, setPass]=useState("");

  function handleUser(e){
    const newText = e.target.value;
    setUser(newText);
  }
  function handleEmail(e){
    const newText = e.target.value;
    setEmail(newText);
  }
  function handlePass(e){
    const newText = e.target.value;
    setPass(newText);
  }
  function handleSubmit(){
    dispatch(signup({user, email, pass}));
    setTimeout(()=>{
      navigate('/')
    }, 2000);
  }


  return (
    <div className='Auth-container'>
      <div className='Auth-left'>
        <h3>Already a user, Login instead</h3>
        <button onClick={()=>{navigate('/login');}}>Login</button>
      </div>
      <div className='Auth-right'>
        <h2>Signup</h2>
        <input placeholder='username..' onChange={handleUser}/>
        <input placeholder='email...' onChange={handleEmail}/>
        <input placeholder='password...' onChange={handlePass} type='password'/>
        <button onClick={handleSubmit}>Signup</button>
        </div>
    </div>
  )
}