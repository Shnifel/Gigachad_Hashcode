import {db} from "../../database/firebase.js"


export const login = async (req, res) => {
try {
  const user = req.body.uid;
  const query= await db.collection('Users').doc(user).get()
  return res.status(200).json(query.data());
   
    
} catch (error) {
    return res.status(400).json(error.message);
}
};

