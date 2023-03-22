import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" >
      <Route index element = {<Login/>}/>
      <Route path = "Register" element = {<Register/>}/>
    </Route>

  )
)

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router = {router} />
    </div>
    );
}

export default App