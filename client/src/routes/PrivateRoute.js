import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserID, setAdmin } from '../stateManagement/state';
import CryptoJS from 'crypto-js';


const PrivateRoute = () => {

  function encrypt(value, secretKey) {
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    return encryptedValue;
  }
  
  function decrypt(value, secretKey) {
    const decryptedBytes = CryptoJS.AES.decrypt(value, secretKey);
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  }


    const storageState = JSON.parse(localStorage.getItem("STORAGE_STATE"));
    const isLoggedIn = storageState;
    const dispatch = useDispatch();

    if (isLoggedIn) {
      dispatch(setUserID(storageState.uid))
      dispatch(setAdmin(decrypt(storageState.isAdmin, "hashcode-123") === "true"))
    }

    return(
      isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute;