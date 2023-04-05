import { async } from "@firebase/util";
import { db } from "../../database/firebase.js";
import crypto from "crypto";
import { Admin } from "../../database/firebase.js";

export const joinTeams = async(req,res) => {
    const user = req.body.uid;
    const compid = req.body.compid;

    const teamCode= req.body.teamCode;
    const compRef = await db.collection('Competitions').doc(compid).get();
    const queryresult = await db.collection('Teams').where('members', 'array-contains', db.collection('Users').doc(user)).get().then(querySnapshot => {
        querySnapshot.docs.map(doc => {
            compRef.data().teams.some((team) => team.isEqual(db.collection("Teams").doc(doc.id)))
        })
    }).catch((error)=>{

    }); 


    await db.collection('Teams').where('teamCode', '==', teamCode).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            return res.status(404).json("No such team found")
            
        }

        const members = querySnapshot.docs[0].members;
        if (members.some((member) => member.isEqual(db.collection('Users').doc(user)))) {
            return res.status(409).json("You're already a member of this team")
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