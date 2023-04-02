import { signInWithEmailAndPassword } from "firebase/auth";
import {Auth,db} from "../../database/firebase.js"
import {doc,setDoc,getDocs,collection,query,onSnapshot,where,documentId} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


export const login = async (req, res) => {
try {
   const user = await signInWithEmailAndPassword(Auth,req.body.email,req.body.password)
    const id = user.user.uid
    
    
    const q = query(db.collection('Users') ,where(documentId(), "==", id))
     onSnapshot(q, (querySnapshot) => {
   return res.status(200).json(querySnapshot.docs.map(doc =>({
    id: doc.id,
    data:doc.data()
   })))
  })
    
} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    return res.status(400).json(errorMessage); 
}
};