import { async } from "@firebase/util";
import { db } from "../../database/firebase.js";
import crypto from "crypto";
import { Admin } from "../../database/firebase.js";

export const joinTeams = async(req,res) => {
    const user = req.body.uid
    

    const teamCode= req.body.teamCode
    const queryresult = await db.collection('Teams').where('members', 'array-contains', db.collection('Users').doc(user)).get().catch((error)=>{
        return res.status(400).json("Unauthorised")
    }); 
    if (!queryresult.empty){
        return res.status(409).json("You can only be registered in one team")
    }
    await db.collection('Teams').where('teamCode', '==', teamCode).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            return res.status(404).json("No such team found")
            
        }
        const teamid = querySnapshot.docs[0].id
        const teamref =  db.collection('Teams').doc(teamid)
        teamref.update({members: Admin.firestore.FieldValue.arrayUnion(db.collection('Users').doc(user))})
        return res.status(200).json("Succesfully joined team")
    })
    .catch((error) => {
        return res.status(400).json("Failed to join team")
    });;
    

  }