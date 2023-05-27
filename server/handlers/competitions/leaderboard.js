import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";


export const getLeaderboard = async (req, res) => {
    try {
        const compid = req.body.compid

        const compRef = db.collection("Competitions").doc(compid);

        const compData = (await compRef.get()).data();
        const teamsRefs = compData.teams;

        const teamsPromises = teamsRefs.map( // Take each team reference and get data
        async(teamRef) => {
          const teamDoc = await teamRef.get()
          const teamData = teamDoc.data()
          const subs = teamData.subsRef
          const subScores = (await db.collection("Submissions").doc(subs).get()).data().max_scores
          const member = teamData.members[0]
          const location = (await member.get()).data().location 

          return {id: teamDoc.id, teamname:teamData.teamname, scores: subScores, location: location};
    });

    const leaderboard = await Promise.all(teamsPromises);

    return res.status(200).json(leaderboard);

    } catch (error) {
      console.log(error.message)
      return res.status(400).json(error.message)
    }
}