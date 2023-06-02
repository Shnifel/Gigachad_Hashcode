import {Auth,db} from "../../Firebase.js"
import { createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,signInWithPopup, sendPasswordResetEmail, signOut, updateEmail, updateProfile} from "firebase/auth";
import {collection,doc,setDoc,query,onSnapshot,where,documentId} from "firebase/firestore";
import { googleProvider } from "../../Firebase.js";
import axios from "axios";
import CryptoJS from "crypto-js";
const baseurl="https://smiling-bass-train.cyclic.app/server"
//Handling Error message
function Error(message) {
    this.message = message;
}
//Handling Success message
function Success(message) {
    this.message = message;
}
//Defining User Registration
export const registerHandler = async (req) => {
        //Retrieveing details for Registration to post
        const name= req.name
        const surname=req.surname
        const email=req.email
        const usercredential = await createUserWithEmailAndPassword(Auth,req.email,req.password)
        const uid = usercredential.user.uid
        const image = usercredential.user.photoURL
        const userref = doc(db,"Users",uid)
        await setDoc(userref,{name,surname,email,isAdmin:false, image})
        //SEnding email verification
        sendEmailVerification(Auth.currentUser)

        return new Success("Successfully registered ! Please check your emails to verify the email sent to you");

    

};
//Defining User Log in
export const loginHandler = async (inputs) => {
    //Retriving User details
    const user = await signInWithEmailAndPassword(Auth,inputs.email,inputs.password)
    const id = user.user.uid
    //Checking that email is verified
    const emailVerified = user.user.emailVerified;
    //Handling case of email not verified
    if (! emailVerified){
        throw new Error("Please verify your email before logging in");
    }
    const creds = {uid : id}
    //retrieving user's data
    const response = await axios.post(baseurl +"/auth/login",creds); 
    //Handling Success case
    if (response.status == 200){
        const user_info = {uid: id, isAdmin: CryptoJS.AES.encrypt(response.data.isAdmin.toString(), "hashcode-123").toString()}
        localStorage.setItem("STORAGE_STATE", JSON.stringify(user_info))
    }
    
    return response.data;
}

//Defining Google Auth
export const googleAuth = async (response) => {
    //Retrieving user details from FireBase 
    const user = await signInWithPopup(Auth,googleProvider);
    const id = user.user.uid
    const creds = {uid : id}
    localStorage.setItem("uid", id)
    const res = await axios.post(baseurl + "/auth/login",creds); 
    //Handling success case
    if (res.status == 200){
        const user_info = {uid: id, isAdmin: CryptoJS.AES.encrypt(res.data.isAdmin.toString(), "hashcode-123").toString()}
        localStorage.setItem("STORAGE_STATE", JSON.stringify(user_info))
    }
    return res.data;
}
//Handling password reset by sending password reset email
export const passwordReset = async (email) => {
    await sendPasswordResetEmail(Auth, email);
}
//Handling user log out
export const logout = () => {
    signOut(Auth);
    localStorage.removeItem("STORAGE_STATE");
}
//Handling user update profile
export const updateUserProfile = async(data) => {
    const response = await axios.post(baseurl +"/auth/updateProfile", data);
    return response.data;
}
//Hadnling retrieveing a user's profie
export const getProfile = async(data) => {
    const response = await axios.post(baseurl + "/auth/login", data);
    return response.data;
}
//Handling user's email being updated
export const changeEmail = async(email) => {
    const response = await updateEmail(Auth.currentUser,email)
    
}
//Handling user's profile details being changed
export const changeProfile = async(data) => {
    const response = await updateProfile(Auth.currentUser,data);
    
}
