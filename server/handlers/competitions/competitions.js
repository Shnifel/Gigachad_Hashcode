import { db } from "../../database/firebase.js";

//CRUD Operations for competition data


/**
 * @description Given details of a competition will create and register a new competition
 *
 * @async
 * @param {*} req Admin, Competition Name, Competition Description, Registration Start, Registration End, Competition Date, Max and min team size, Limit on Number of teams
 * @param {*} res HTTP Response body
 * @returns {*}
 */
export const createCompetition = async(req,res) => {
    // Extract competition details from request
    const admin = req.body.uid  // Which admin is creating this competition
    const compname = req.body.compname // What is the competition name
    const compdesc = req.body.compdesc // A description of what the competition is about
    const regstartdate = req.body.regstartdate // When does registration open
    const regenddate = req.body.regenddate // When does registration close
    const compdate = req.body.compdate // When is the competition + time starts
    const max_teamsize = req.body.max_teamsize // Limit on number of team numbers
    const numteams = req.body.numteams // Limit on number of teams
    const min_teamsize = req.body.min_teamsize // Min people in a team

    // Add to competitions collection in firestore
    db.collection('Competitions').add({
        admin,compname,compdesc,regstartdate,regenddate,compdate,min_teamsize, max_teamsize,numteams,teams:[] // Teams array with references to all teams entered in competition
      })
      .then((docRef) => {
        // Get competition reference for current competition and return it back to client
        const compid= docRef.id
        return res.status(200).json({compid})
      })
      .catch((error) => {
        //Unsuccessful in creating competition - return firebase error
        console.log('Error adding document: ', error);
        return res.status(400).json(error.message)  
      });            
}



/**
 * @description Retrieve all competitions from database
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getCompetitions = async (req, res) => {
    // Create reference to competitions collection
    const collectionRef = db.collection("Competitions");
  
    // get() data from collection
    try {
      const querySnapshot = await collectionRef.get();
      const competitions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      return res.status(200).json(competitions);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  


export const getCompetition = async (req, res) => {
    try {
        const compid = req.body.compid;
    console.log(compid);
    const compRef = db.collection("Competitions").doc(compid);

    await compRef.get().then(
        query => {
            return res.status(200).json(
                {
                    id: query.id,
                    data: query.data()
                }
            )
        }
    ).catch(
        error => {return res.status(400).json(error.message)}
    )
    } catch (error) {
      return res.status(400).json("Unexpected error")  
    }
    
}

/**
 * @description Update current details of competition
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const updateCompetition = async(req, res) => {
    //Given competition data, will update any changes made to it

    const compid = req.body.compid //Extract competition id from request body
    const docRef = db.collection("Competitions").doc(compid);

    //Assumes all competition metadata will be sent from client to be updated
    const updatedData = {
    compname : req.body.compname, // What is the competition name
    compdesc : req.body.compdesc, // A description of what the competition is about
    regstartdate : req.body.regstartdate, // When does registration open
    regenddate : req.body.regenddate, // When does registration close
    compdate : req.body.compdate, // When is the competition + time starts
    max_teamsize : req.body.max_teamsize ,// Limit on number of team numbers
    numteams : req.body.numteams, // Limit on number of teams
    min_teamsize : req.body.min_teamsize ,// Min people in a team
    }


    //Perform update
    docRef.update(updatedData).then(() => {
        return res.status(200).json("Successfully updated competition data")
    }).catch((error) => {
        return res.status(400).json("An error has occurred in attempting to update the competition")
    })
}

/**
 * @description Deletes all data related to a particular competition including teams
 * @param {*} req 
 * @param {*} res 
 */
export const deleteCompetition = async(req, res) => {
    //Get competition id
    const compid = req.body.compid
    const docRef = db.collection("Competitions").doc(compid)

    //Create a batch operation to delete all teams
    const batch = db.batch()

    //Delete all teams under registered competition
    const teamRefs = (await docRef.get()).data().teams

    // Loop through each team reference and add a delete operation to the batch
    teamRefs.forEach(teamRef => {
    batch.delete(teamRef);
    });

    // Commit the batch operation
    batch.commit()
    .then(() => {
        docRef.delete().then(() => {
            return res.status(200).json("Successfully deleted competition")
        }).catch((error) => {
            return res.status(400).json("Error in deleting competition - please try again")
        })
    })
    .catch((error) => {
       return res.status(400).json('Error deleting competition: ', error);
    });

}

