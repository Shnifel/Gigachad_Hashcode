import React from 'react'
import {useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'


const PrivateRoute = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return(
      isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute;