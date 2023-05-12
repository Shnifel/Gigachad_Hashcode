import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";

export const addSubmission = async (req, res) => {

    try {
        const subsid = req.body.subsid;
        const compid = req.body.compid;
        const test_case = req.body.test_case;
        const subsRef = db.collection("Submissions").doc(subsid);

        const data = (await subsRef.get()).data();
        const max_score = data.max_scores[index];


        const feedback = "cool" // invoke file marking
        const score = 10

        const subData = {time: new Date().toLocaleString(), feedback}

        await subsRef.update({subs_history: Admin.firestore.FieldValue.arrayUnion(subData)})

        if (score > max_score){
            const updated_scores = [...data.max_scores]
            updated_scores[index] = score
            await subsRef.update({max_scores: updated_scores})
        }

        return res.status(200).json(feedback);


    } catch (error) {

        return res.status(400).json(error.message);
    }
    
    
}