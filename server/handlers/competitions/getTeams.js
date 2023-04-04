import { db } from "../../database/firebase.js";

export const getTeams = async(req,res) => {

    try {
    const compid = req.body.compid;
    const competitionDoc = await db.collection('competitions').doc(compid).get();
    const teamsRefs = competitionDoc.data().teams;
    const teamsPromises = teamsRefs.map(teamRef => teamRef.get().catch(error => {
        return res.status(400).json("Teams data retrieval unsuccessful")
    }));
    const teamsSnapshots = await Promise.all(teamsPromises);
    
    return res.status(200).json(teamsSnapshots.map(teamSnapshot => {
        const teamData = teamSnapshot.data();
        return { id: teamSnapshot.id, ...teamData };
    }));
    } catch (error) {
        return res.status(400).json("An unexpected error has occurred retrieving teams data");
    }
    
}
