import { async } from "@firebase/util";
import { db } from "../../database/firebase.js";
import crypto from "crypto";
import { Admin } from "../../database/firebase.js";



export const createTeams = async(req,res) => {
    const user = req.body.uid
    const teamname=req.body.teamname
    const buffer = crypto.randomBytes(5)
    const compid= req.body.compid
    const teamCode= buffer.toString("base64")
    const querySnapshot = await db.collection('Teams').where('teamname', '==', teamname).get().catch((error) => {
      return res.status(400).json("Unknown error")
    });

    const promise = querySnapshot.docs.map(teamRef => 
      db.collection('Competitions').where('teams', 'array-contains', db.collection('Teams').doc(teamRef.id)).where(Admin.firestore.FieldPath.documentId(), '==', db.collection('Competitions').doc(compid)).get().catch((error) => {
       return res.status(409).json("Error performing operation")
}))

   let unique = true;
   const snaps = await Promise.all(promise)
   snaps.map(snapshot => {
     if (! snapshot.empty){
     unique = false;
   }})
   if (! unique){
     return res.status(409).json("Team name already in use")
   }
    
    const teamRefs = await db.collection('Teams').where('members', 'array-contains', db.collection('Users').doc(user)).get().catch((error) =>{
      return res.status(400).json("Unexpected error encountered");
    }); 

    const promises = teamRefs.docs.map(teamRef => 
       db.collection('Competitions').where('teams', 'array-contains', db.collection('Teams').doc(teamRef.id)).where(Admin.firestore.FieldPath.documentId(), '==', db.collection('Competitions').doc(compid)).get().catch((error) => {
        return res.status(409).json("Error performing operation")
}))

    let invalid = false;
    const snapshots = await Promise.all(promises)
    snapshots.map(snapshot => {
      if (! snapshot.empty){
      invalid = true;
    }})
    if (invalid){
      return res.status(409).json("You can only be registered in one team")
    }
    // Value is unique, add the document to the collection
    
    await db.collection('Teams').add({teamname,teamCode,members:[db.collection('Users').doc(user)] }).then((TeamRef) => {

        const competitionRef = db.collection('Competitions').doc(compid);
        
        const Teamid= TeamRef.id
        competitionRef.update({
            teams: Admin.firestore.FieldValue.arrayUnion(TeamRef)
          }).then(() => {
            return res.status(200).json({teamCode})
          }).catch((error) => {
            return res.status(400).json(error.message)      
          });
        
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      return res.status(400).json(error.message)  
      });

  }

                