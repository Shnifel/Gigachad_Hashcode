import { db } from "../../database/firebase.js";
import crypto from "crypto";
import { Admin } from "../../database/firebase.js";

// CRUD Operations for Teams

/**
 * @description Retrieves all teams for a particular competition - exclusive to admin usage
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
export const getTeams = async(req,res) => {
    try {
    const compid = req.body.compid; // Competition ID
    const competitionDoc = await db.collection('Competitions').doc(compid).get(); //Obtain data from firestore
    const teamsRefs = competitionDoc.data().teams; //Get array of references to team collections
    const teamsPromises = teamsRefs.map(
        //Map each teamRef to its data in the firestore and await all
        teamRef => teamRef.get().catch(error => {
        console.log(error.data);
        return res.status(400).json("Teams data retrieval unsuccessful")
    }));

    //Promise ensures that all async requests to teams data is obtained before proceeding
    const teamsSnapshots = await Promise.all(teamsPromises);

    //Convert teams data for given competition into array of teams data
    return res.status(200).json(teamsSnapshots.map(teamSnapshot => {
        const teamData = teamSnapshot.data();
        return { id: teamSnapshot.id, ...teamData };
    }));
    } catch (error) {
        console.log(error.data);
        return res.status(400).json("An unexpected error has occurred retrieving teams data");
    }
}

export const getTeam = async(req, res) => {
    try {
        const compid = req.body.compid
        const user = req.body.uid

        const competitionDoc = await db.collection('Competitions').doc(compid).get();
        const teams = competitionDoc.data().teams

        for (const teamRef of teams) {
            // Get the team document
            const teamDoc = await teamRef.get().catch(error => {
              return res.status(400).json("Team data retrieval unsuccessful");
            });
          
            // Check if the user is already a member of the team
            const members = teamDoc.data().members;
            if (members.some(memberRef => memberRef.id === user)) {
              return res.status(200);
            }
          
            // Check if the team name is already taken
            if (teamDoc.data().name === teamname) {
              return res.status(400).json("Team name is already taken, please choose a different one");
            }
            }

        
    } catch (error) {
        
    }
}


/**
 * @description Creates and registers a new team in Teams collection and add team to competition
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
export const createTeams = async(req,res) => {
    //Extract data from request body
    const user = req.body.uid //UserID
    const teamname=req.body.teamname //TeamName
    const compid= req.body.compid //ID of competition

    const buffer = crypto.randomBytes(5) //Generate random code for joining a team
    const teamCode= buffer.toString("base64") //Convert to base 64

    const teams = (await db.collection("Competitions").doc(compid).get()).data().teams

    // Check each team in the competition
     for (const teamRef of teams) {
    // Get the team document
    const teamDoc = await teamRef.get().catch(error => {
      return res.status(400).json("Team data retrieval unsuccessful");
    });
  
    // Check if the user is already a member of the team
    const members = teamDoc.data().members;
    if (members.some(memberRef => memberRef.id === user)) {
      return res.status(400).json("You are already registered in a team in this competition");
    }
  
    // Check if the team name is already taken
    if (teamDoc.data().name === teamname) {
      return res.status(400).json("Team name is already taken, please choose a different one");
    }
    }

    // Value is unique and user isn't a part of a team, add the document to the collection
    
    await db.collection('Teams').add({teamname,teamCode,members:[db.collection('Users').doc(user)] }).then((TeamRef) => {
        //Update teams in Competition Document to add current team
        const competitionRef = db.collection('Competitions').doc(compid);
        competitionRef.update({
            teams: Admin.firestore.FieldValue.arrayUnion(TeamRef)
          }).then(() => {
            return res.status(200).json({teamCode}) //Return Team Join Code
          }).catch((error) => {
            return res.status(400).json(error.message) //Error has occurred   
          });
        
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      return res.status(400).json(error.message)  
      });

  }

