import React from 'react'
import {useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'


const AdminRoute = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin);

    return(
      isAdmin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default AdminRoute;