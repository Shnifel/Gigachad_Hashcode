import {db} from "../../database/firebase.js"


export const login = async (req, res) => {
try {
  const user = req.body.uid;
   await db.collection('Users').doc(user).get().then(querySnapshot => {
     return res.status(200).json(querySnapshot.data());
   })
    
} catch (error) {
    return res.status(400).json("Unexpected error has occurred");
}
};