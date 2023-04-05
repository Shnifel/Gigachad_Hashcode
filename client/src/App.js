import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';
import Teams from './pages/adminViews/Teams'
import CompetitionForm from './pages/adminViews/CompetitionForm'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserID } from './stateManagement/state';
import { Auth } from './Firebase';

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
  const dispatch = useDispatch();

  useEffect(() => {
  const unsubscribe = Auth.onAuthStateChanged((user) => {
    dispatch(setUserID(user.uid));
    });

    return unsubscribe;
  }, [dispatch]);
  
  return (
    <div className='app'>
      <RouterProvider router = {router} />  
    </div>
    );
}

export default App