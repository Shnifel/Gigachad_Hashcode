

import {Auth,db} from "../../Firebase.js"
import { createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import {collection,doc,setDoc,query,onSnapshot,where,documentId} from "firebase/firestore";
import { googleProvider } from "../../Firebase.js";

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
        const userref = doc(db,"Users",uid)
        await setDoc(userref,{name,surname,email,isAdmin:false})
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
}


export const googleAuth = async (response) => {
    await signInWithPopup(Auth,googleProvider)

}

