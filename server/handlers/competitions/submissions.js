import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";
import { markFile } from "./marker.js";

export const addSubmission = async (req, res) => {

    try {
        const subsid = req.body.subsid;
        const compid = req.body.compid;
        const test_case = req.body.test_case;
        const subsRef = db.collection("Submissions").doc(subsid);

        const data = (await subsRef.get()).data();
        const max_score = data.max_scores[index];


        const feedback = markFile(compid + "/marker.py", compid + "/submissions/" + subsid + "/test_case_" + test_case + ".txt", test_case);
        
        const score = parseInt(feedback);
        const subData = {time: new Date().toLocaleString(), score, test_num}
        

        await subsRef.update({subs_history: Admin.firestore.FieldValue.arrayUnion(subData)})

        if (feedback === -1){
            return res.status(400).json("Marking aborted. Kindly check the format of your text file");
        }

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


export const getSubmissions = async (req, res) => {
    try {
        const subsRef = req.body.subsRef
        const data = await db.collection("Submissions").doc(subsRef).get();
        return res.status(200).json(data.data());
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}