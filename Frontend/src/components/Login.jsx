import React, { useState, useEffect } from 'react'
import { login } from '../redux/actions.js';
import { useDispatch, useSelector,} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state=>state.userReducer.token)
  
  useEffect(()=>{
    if(token){
    navigate('/');
    }
  }, [token])

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
  async function handleSubmit(e){
    dispatch(login({user, email, pass}));
  }


  return (
    <div className='Auth-container'>
    <div className='Auth-left'>
      <h3>New user, Signup instead</h3>
      <button onClick={()=>{navigate('/signup');}}>Signup</button>
    </div>
    <div className='Auth-right'>
      <h2>Login</h2>
      <input placeholder='username..' onChange={handleUser}/>
      <input placeholder='email...' onChange={handleEmail}/>
      <input placeholder='password...' onChange={handlePass} type='password'/>
      <button onClick={handleSubmit}>Login</button>
      </div>
  </div>
  )
}
