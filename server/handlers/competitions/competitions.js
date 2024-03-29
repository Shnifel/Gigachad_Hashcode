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
  try {
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
    const num_tests = req.body.num_tests //Number of test cases
    const compenddate = req.body.compenddate // Competition closing date
    const image = req.body.image //Image name of competition image

    // Add to competitions collection in firestore
    const docRef = await db.collection('Competitions').add({
        admin,compname,compdesc,regstartdate,regenddate,compdate,min_teamsize, max_teamsize,numteams, image, num_tests, compenddate, teams:[] // Teams array with references to all teams entered in competition
      })
   
        // Get competition reference for current competition and return it back to client
        const compid= docRef.id
        return res.status(200).json({compid})
       
  } catch (error) {
    return res.status(400).json(error.message);
  }
       
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

export const getUserCompetitions = async (req, res) => {
  try {
    const userRef = db.collection("Users").doc(req.body.uid) // Get reference to user document
    const usersTeams = await db.collection("Teams").where("members", "array-contains", userRef).get() // Find all teams where where the user is registered
    const competitionIds = usersTeams.docs.map(async(team) => {
      const teamRef = db.collection("Teams").doc(team.id)
      const comp = await db.collection("Competitions").where("teams", "array-contains", teamRef).get() // Find all compettitions where those teams are registered
      return comp.docs[0].id
    })

    const data = await Promise.all(competitionIds); // Return competition ids of all those user is registered in

    return res.status(200).json(data)
    
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(error.message);
  }
}
  

//Retrieve competition data for given competition
export const getCompetition = async (req, res) => {
    try {
     const compid = req.body.compid;
     const compRef = db.collection("Competitions").doc(compid);

    const query = await compRef.get();
    return res.status(200).json(
        {
            id: query.id,
            data: query.data()
        }
    )
    } catch (error) {
      return res.status(400).json(error.message);  
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
    try {
        
    const {compid, ...updatedData} = req.body //Extract competition id from request body
    const docRef = db.collection("Competitions").doc(compid);

    //Perform update
    await docRef.update(updatedData)
    return res.status(200).json("Successfully updated competition data");
   
        

    } catch (error) {
        return res.status(400).json(error.message);
    }

    
}

/**
 * @description Deletes all data related to a particular competition including teams
 * @param {*} req 
 * @param {*} res 
 */
export const deleteCompetition = async(req, res) => {

    try {
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
    docRef.delete();
    return res.status(200).json("Successfully deleted competition");
       
    

    } catch (error) {
        return res.status(400).json(error.message);
    }
    

}

