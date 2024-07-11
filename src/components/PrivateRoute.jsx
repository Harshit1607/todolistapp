import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ()=> {

  const isAuth = !!window.localStorage.getItem('token');
  console.log(window.localStorage.getItem('token'))
  console.log(isAuth)
  return (
    
        isAuth?
        <Outlet />
        : 
        <Navigate to="/login" />
  )
}
