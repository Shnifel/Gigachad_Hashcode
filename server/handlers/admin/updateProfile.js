import { db } from "../../database/firebase.js";

export const updateProfile = async(req, res) => {

    try {
        const image = req.body.image
        const location = req.body.location
        const  uid = req.body.uid
        await db.collection("Users").doc(uid).update({image, location})
        return res.status(200).json("Successfully updated your details");

    } catch (error) {
        return res.status(400).json("Failed to update your profile. Please try again");
    }
    

}