import { async } from "@firebase/util";
import { db } from "../../database/firebase.js";

export const createCompetition = async(req,res) => {
    const admin = req.body.uid  
    const compname = req.body.compname
    const compdesc = req.body.compdesc
    const regstartdate = req.body.regstartdate
    const regenddate = req.body.regenddate
    const compdate = req.body.compdate
    const teamsize = req.body.teamsize
    const numteams = req.body.numteams

    db.collection('Competitions').add({
        admin,compname,compdesc,regstartdate,regenddate,compdate,teamsize,numteams,teams:[]

        
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        const compid= docRef.id
        return res.status(200).json({compid})
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        return res.status(400).json(error.message)  
      });            


}