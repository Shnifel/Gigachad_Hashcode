import {Auth,db} from "../../Firebase.js"
import { createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,signInWithPopup, sendPasswordResetEmail, signOut} from "firebase/auth";
import {collection,doc,setDoc,query,onSnapshot,where,documentId} from "firebase/firestore";
import { googleProvider } from "../../Firebase.js";
import axios from "axios";


function Error(message) {
    this.message = message;
}

function Success(message) {
    this.message = message;
}

export const registerHandler = async (req) => {
    
        const name= req.name
        const surname=req.surname
        const email=req.email
        const usercredential = await createUserWithEmailAndPassword(Auth,req.email,req.password)
        const uid = usercredential.user.uid
        const image = usercredential.user.photoURL
        const userref = doc(db,"Users",uid)
        await setDoc(userref,{name,surname,email,isAdmin:false, image})
        sendEmailVerification(Auth.currentUser)

        return new Success("Successfully registered ! Please check your emails to verify the email sent to you");

    

};

export const loginHandler = async (inputs) => {
    const user = await signInWithEmailAndPassword(Auth,inputs.email,inputs.password)
    const id = user.user.uid
    
    const emailVerified = user.user.emailVerified;

    if (! emailVerified){
        throw new Error("Please verify your email before logging in");
    }

    const creds = {uid : id}
    const response = await axios.post("/auth/login",creds); 
    return response.data;
}


export const googleAuth = async (response) => {
    const user = await signInWithPopup(Auth,googleProvider);
    const id = user.user.uid
    const creds = {uid : id}
    const res = await axios.post("/auth/login",creds); 
    return res.data;
}

export const passwordReset = async (email) => {
    await sendPasswordResetEmail(Auth, email);
}

export const logout = () => {
    signOut(Auth);
}

export const updateProfile = async(data) => {
    const response = await axios.post("/auth/updateProfile", data);
    return response.data;
}
