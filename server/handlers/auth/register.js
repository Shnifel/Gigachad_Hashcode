import {Auth,db} from "../../database/firebase.js"
import { createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";


export const register = async (req, res) => {
    try {
        const name= req.body.name
        const surname=req.body.surname
        const email=req.body.email
        const usercredential = await createUserWithEmailAndPassword(Auth,req.body.email,req.body.password)
        const uid = usercredential.user.uid
        const userref = doc(db,"Users",uid)
        await setDoc(userref,{name,surname,email})
        sendEmailVerification(Auth.currentUser)
    } catch (error) {
        console.log(error)    
    }

};