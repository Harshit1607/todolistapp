import React from 'react';
import { TodoList } from './TodoList.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Login.jsx';
import { Signup } from './Signup.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';

function App() {
  return (
    <Router >
      <div className='App'>
      <Routes >
      <Route element={<PrivateRoute />}>
      <Route path='/' element={<TodoList />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
    </Router>
  );

}

export default App;
