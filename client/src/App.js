import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';
import Teams from './pages/adminViews/Teams'
import CompetitionForm from './pages/adminViews/CompetitionForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" >
      <Route exact index element = {<Login/>}/>
      <Route path = "Register" element = {<Register/>}/>
      <Route element = {<PrivateRoute/>}>
        <Route path = "Dashboard" element={<Dashboard/>} exact/>
        <Route path = "Teams" element = {<Teams/>} exact/>
        <Route path = "CreateCompetition" element = {<CompetitionForm/>} exact />
      </Route>
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