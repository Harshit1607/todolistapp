import React, { useState } from 'react'
import { login } from '../redux/actions.js';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  function handleSubmit(e){
    dispatch(login({user, email, pass}))
    navigate('/');
  }


  return (
    <div>
      <h2>Login</h2>
      <div>
        <input placeholder='username..' onChange={handleUser}/>
        <input placeholder='email...' onChange={handleEmail}/>
        <input placeholder='password...' onChange={handlePass}/>
        <button onClick={handleSubmit}>Login</button>
        </div>
    </div>
  )
}
