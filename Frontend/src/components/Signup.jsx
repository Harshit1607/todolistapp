import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { signup } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = useSelector(state=>state.userReducer.token)
  
  useEffect(()=>{
    if(token){
    navigate('/');
    }
  }, [token])

  const[user, setUser]=useState("");
  const[email, setEmail]=useState("");
  const[pass, setPass]=useState("");
  const[hidePass,setHidePass] = useState(true)

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
  function handleHidepass(){
    setHidePass(!hidePass)
  }
  function handleSubmit(){
    dispatch(signup({user, email, pass}));
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
        <div className="auth-pass-container">
        <input placeholder='password...' onChange={handlePass} type={hidePass? 'password' : 'text'} className='auth-pass'/>
        <img src={hidePass?'https://cdn-icons-png.flaticon.com/256/367/367070.png': 'https://www.svgrepo.com/show/325176/eye-off.svg'} className='auth-eye' onClick={handleHidepass}/>
        </div>
        <button onClick={handleSubmit}>Signup</button>
        </div>
    </div>
  )
}