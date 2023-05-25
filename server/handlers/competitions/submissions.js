import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";
import { markFile } from "./marker.js";

export const addSubmission = async (req, res) => {

    try {
        //Get Submission Document ID
        const subsid = req.body.subsid;
        //Get CompID
        const compid = req.body.compid;
        //Get Test Case Number
        const test_case = req.body.test_case;
        //Retrieve Submission Data for given team
        const subsRef = db.collection("Submissions").doc(subsid);

        const data = (await subsRef.get()).data();
        const max_score = data.max_scores[test_case - 1];
        //Call Marker File to mark current submission
        let feedback;
        try {
            feedback = await markFile(compid + "/marker.py", compid + "/submissions/" + subsid + "/test_case_" + test_case + ".txt", test_case);
        } catch (error) {
            //Marking Time out or invalid format return error
            feedback = error.message;
            const subData = {time: new Date().toLocaleString(), score: -1, feedback, test_case}
            await subsRef.update({subs_history: Admin.firestore.FieldValue.arrayUnion(subData)})
            return res.status(400).json(feedback);
        }
        //Marking Succesful, Obtain Score
        
        const score = parseInt(feedback);
        const subData = {time: new Date().toLocaleString(), score, test_case}

        //Add to submissions history 
        await subsRef.update({subs_history: Admin.firestore.FieldValue.arrayUnion(subData)})
        //Keeping Max Score of User's Scores
        if (score > max_score){
            const updated_scores = [...data.max_scores]
            updated_scores[test_case - 1] = score
            await subsRef.update({max_scores: updated_scores})
        }
        //Return Score for Succesful Marking
        return res.status(200).json(feedback);


    } catch (error) {
        //Return Firebase Error
        return res.status(400).json(error.message);
    }
}


export const getSubmissions = async (req, res) => {
    try {
        const subsRef = req.body.subsRef
        const data = await db.collection("Submissions").doc(subsRef).get();
        return res.status(200).json(data.data());

    } catch (error) {
        return res.status(400).json(error.message);
    }
}
