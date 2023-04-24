import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, useNavigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import './App.css';
import Teams from './pages/Teams'
import TeamAdmin from './pages/adminViews/Teams';
import CompetitionForm from './pages/adminViews/CompetitionForm'
import CompetitionsPage from './pages/adminViews/Competition';
import ProfilePage from './pages/ProfilePage';
import { useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';
import { setUserID, setLoggedIn } from './stateManagement/state';
import { Auth } from './Firebase';
import { logout } from './handlers/auth/auth';
import Home from './pages/Home';
import Competition from './pages/Competition';


const App = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" >
        <Route exact index element = {<Login/>}/>
        <Route path = "Register" element = {<Register/>}/>
        <Route element = {<PrivateRoute/>}>
          <Route path = "Dashboard" element={<Dashboard/>} exact/>
          <Route path = "Home" element={<Home/>} exact />
          <Route path = "Teams" element = {isAdmin ? <TeamAdmin/> : <Teams/>} exact/>
          <Route path = "CreateCompetition" element = {<CompetitionForm/>} exact />
          <Route path = "ProfilePage" element = {<ProfilePage/>} exact />
          <Route path = "Competition" element = {<Competition/>}/>
        </Route>
      </Route>

    )
  )

  useEffect(() => {
  const unsubscribe = Auth.onAuthStateChanged((user) => {
    dispatch(setUserID(user.uid));
    if (user) {
      dispatch(setLoggedIn(true));
    }
    else{
      dispatch(setLoggedIn(false));
    }
    });

    return unsubscribe;
  }, [dispatch, logout]);
  
  return (
    <div className='app'>
      <RouterProvider router = {router} />  
    </div>
    );
}

export default App