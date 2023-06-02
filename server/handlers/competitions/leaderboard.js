import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";


export const getLeaderboard = async (req, res) => {
    try {
        const compid = req.body.compid

        const compRef = db.collection("Competitions").doc(compid); // Get reference to competition

        const compData = (await compRef.get()).data(); // Get competition data
        const teamsRefs = compData.teams; // Get competition teams from data

        const teamsPromises = teamsRefs.map( // Take each team reference and get data
        async(teamRef) => {
          const teamDoc = await teamRef.get()
          const teamData = teamDoc.data() // Retrieve teams data
          const subs = teamData.subsRef // Get submissions reference
          const subScores = (await db.collection("Submissions").doc(subs).get()).data().max_scores // Retrieve submissions highest scores from Submissions document for team
          const member = teamData.members[0]
          const location = (await member.get()).data().location // Retrieve location - location of team leader

          return {id: teamDoc.id, teamname:teamData.teamname, scores: subScores, location: location}; // Return JSON object of row in leaderboard tea,
    });

    const leaderboard = await Promise.all(teamsPromises); // Return array of compiled json objects

    return res.status(200).json(leaderboard);

    } catch (error) {
      console.log(error.message)
      return res.status(400).json(error.message)
    }
}