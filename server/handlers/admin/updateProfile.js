import { db } from "../../database/firebase.js";

export const updateProfile = async(req, res) => {

    try {
        const  {uid, ...updates} = req.body
        await db.collection("Users").doc(uid).update(updates)
        return res.status(200).json("Successfully updated your details");

    } catch (error) {
        return res.status(400).json(error.message);
    }
    

}