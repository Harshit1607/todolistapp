import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const signupdetails = useSelector(state=>state.userReducer.state)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //console.log(signupdetails);
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
    dispatch(signup({user, email, pass}))
    .then(
      navigate('/')
    )
    
  }


  return (
    <div>
      <h2>Signup</h2>
      <div>
        <input placeholder='username..' onChange={handleUser}/>
        <input placeholder='email...' onChange={handleEmail}/>
        <input placeholder='password...' onChange={handlePass}/>
        <button onClick={handleSubmit}>Signup</button>
        </div>
    </div>
  )
}