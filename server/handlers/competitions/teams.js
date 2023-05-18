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
    const teamsPromises = teamsRefs.map( // Take each team reference and get data
        async(teamRef) => {
          const teamDoc = await teamRef.get()
          const mems = teamDoc.data().members

          const memberPromises = mems.map(
            //Get data for each member in team
            async (member) => {
              const memberDoc = await member.get()
              const memberData = memberDoc.data()
              return {id: memberDoc.id, ...memberData}
            }
          )

          const membersData = await Promise.all(memberPromises)

          const {members, ...teamData} = teamDoc.data();

          return {id: teamDoc.id, teamData, members: membersData};
    });

    //Promise ensures that all async requests to teams data is obtained before proceeding
    const teamsSnapshots = await Promise.all(teamsPromises);

    //Convert teams data for given competition into array of teams data
    return res.status(200).json(teamsSnapshots);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

/**
 * @description For a given competition id and user, retrieves team that member belongs to
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getTeam = async(req, res) => {
    try {
        const compid = req.body.compid
        const user = req.body.uid

        const competitionDoc = await db.collection('Competitions').doc(compid).get();
        console.log(competitionDoc)
        const teams = competitionDoc.data().teams

        for (const teamRef of teams) {
            const teamDoc = await teamRef.get()
            const {members, ...teamData} = teamDoc.data()

            if (members.some(memberRef => memberRef.id === user)) {
              const membersPromises = members.map(
                async (member) => {
                  const memDoc = await member.get()
                  const memData = memDoc.data()
                  return {id: memDoc.id, ...memData}
                }
              )

              const memberData = await Promise.all(membersPromises)
              
              return res.status(200).json({id: teamDoc.id, teamData, membersData: memberData})
            }
        }

        return res.status(400).json("You are not registered in this competition")
      }
    catch (error) {
        return res.status(400).json(error.message)
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
  try {
     //Extract data from request body
    const user = req.body.uid //UserID
    const teamname=req.body.teamname //TeamName
    const compid= req.body.compid //ID of competition

    const buffer = crypto.randomBytes(5) //Generate random code for joining a team
    const teamCode= buffer.toString("base64") //Convert to base 64

    const comp_data = (await db.collection("Competitions").doc(compid).get()).data()
    const teams = comp_data.teams

    // Check each team in the competition
     for (const teamRef of teams) {
    // Get the team document
    const teamDoc = await teamRef.get();
  
    // Check if the user is already a member of the team
    const members = teamDoc.data().members;
    if (members.some(memberRef => memberRef.id === user)) {
      return res.status(400).json("You are already registered in a team in this competition");
    }
  
    // Check if the team name is already taken
    if (teamDoc.data().teamname === teamname) {
      return res.status(400).json("Team name is already taken, please choose a different one");
    }
    }

    // Value is unique and user isn't a part of a team, add the document to the collection
    //Create a submissions reference for team

    const subsRef = await db.collection('Submissions').add({max_scores: Array(parseInt(comp_data.num_tests)).fill(null), subs_history : []})
    
    const TeamRef = await db.collection('Teams').add({teamname,teamCode,members:[db.collection('Users').doc(user)], subsRef: subsRef.id })
    //Update teams in Competition Document to add current team
    const competitionRef = db.collection('Competitions').doc(compid);
    await competitionRef.update({
        teams: Admin.firestore.FieldValue.arrayUnion(TeamRef)
    });
    return res.status(200).json({id: TeamRef.id, teamCode}) //Return Team Join Code
      
        
      

  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
   
  }

/**
 * @description Adds and validates a user attempting to join a team
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
  export const joinTeam = async(req,res) => {
    try {
    const user = req.body.uid;
    const compid = req.body.compid;
    const teamCode = req.body.teamCode;

    const compRef = await db.collection('Competitions').doc(compid).get();
    const teams = compRef.data().teams

    // Check each team in the competition
    for (const teamRef of teams) {
      // Get the team document
      const teamDoc = await teamRef.get();
      // Check if the user is already a member of the team
      const members = teamDoc.data().members;
      if (members.some(memberRef => memberRef.id === user)) {
        return res.status(400).json("You are already registered in a team in this competition");
      }
    }
  
    
    const querySnapshot = await db.collection('Teams').where('teamCode', '==', teamCode).get()
      //Invalid join code passed
      if (querySnapshot.empty) {
            return res.status(404).json("No such team found")
      }
      //Team found, add user to team
      const teamid = querySnapshot.docs[0].id
      const teamref =  db.collection('Teams').doc(teamid)
      teamref.update({members: Admin.firestore.FieldValue.arrayUnion(db.collection('Users').doc(user))})
      return res.status(200).json("Succesfully joined team")

  
    } catch (error) {
      console.log(error.message)
      return res.status(400).json("Failed to join team");
    }
    
 }

/**
 * @description Removes a member from a team
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 export const deleteMember = async (req, res) => {
  try {
    const user = db.collection('Users').doc(req.body.uid)
    const team = db.collection('Teams').doc(req.body.teamid)
    team.update({members : Admin.firestore.FieldValue.arrayRemove(user)})

    return res.status(200).json("Successfully removed member")
  } catch (error) {
    return res.status(400).json("Error removing member from team")
  }
 }

 /**
  * @description Remove a team from a competition
  * @param {*} req 
  * @param {*} res 
  * @returns 
  */
 export const deleteTeam = async (req, res) => {
  try {
    const team = req.body.teamid
    const teamRef = db.collection('Teams').doc(team)
    const compRef = db.collection('Competitions').doc(req.body.compid)

    await compRef.update({teams: Admin.firestore.FieldValue.arrayRemove(teamRef)})
    await teamRef.delete()
    return res.status(200).json("Successfully deleted team")
   
  } catch (error) {
    return res.status(400).json("Error deleting team")
  }
 }

 export const updateTeam = async(req, res) => {
  try {
    const {teamid, ...updatedData} = req.body;
    const teamRef = db.collection("Teams").doc(teamid);
    await teamRef.update(updatedData);
    return res.status(200).json("Successfully updated team");
  } catch (error) {
    return res.status(400).json("An unexpected error has occurred")
  }
  
 }
  

