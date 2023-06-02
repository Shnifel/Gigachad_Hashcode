import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, useNavigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';
import Teams from './pages/Teams'
import CompetitionForm from './pages/adminViews/CompetitionForm'
import ProfilePage from './pages/ProfilePage';
import { useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';
import { setUserID, setLoggedIn } from './stateManagement/state';
import { Auth } from './Firebase';
import { logout } from './handlers/auth/auth';
import Home from './pages/Home';
import Competition from './pages/Competition';
import CompetitionAdmin from './pages/CompetitionAdmin';

//Hadling Entire websites properties
const App = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" >
        <Route exact index element = {<Login/>}/>
        <Route path = "Register" element = {<Register/>}/>
        <Route element = {<PrivateRoute/>}>
          <Route path = "Home" element={<Home/>} exact />
          <Route path = "CreateCompetition" element = {<CompetitionForm/>} exact />
          <Route path = "ProfilePage" element = {<ProfilePage/>} exact />
          <Route path = "Competition" element = {<Competition/>}/>
          <Route path = "CompetitionsAdmin" element = {<CompetitionAdmin/>}/>
        </Route>
      </Route>

    )
  )
  
  return (
    <div className='app'>
      <RouterProvider router = {router} />  
    </div>
    );
}

export default App