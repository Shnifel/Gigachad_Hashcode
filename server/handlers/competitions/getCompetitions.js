import { async } from "@firebase/util";
import { db } from "../../database/firebase.js";

export const getCompetitions = async(req,res) => {
    const collectionRef =db.collection("Competitions");

    // Retrieve documents where a certain field matches a certain value
    collectionRef.get()
      .then(querySnapshot => {
        // Log the data of each document
        return res.status(200).json(querySnapshot.docs.map(doc =>({
            id: doc.id,
            data:doc.data()
           })))
        
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
        return res.status(400).json(error.message)
    });
}
