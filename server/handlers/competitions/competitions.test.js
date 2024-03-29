// Import the function to test and Firebase
import { createCompetition, getCompetitions, getCompetition, updateCompetition, deleteCompetition, getUserCompetitions } from './competitions.js';
import { db } from '../../database/firebase.js';

// Mock the Firebase Firestore methods
jest.mock('../../database/firebase.js', () => {
  return {
    db: {
      collection: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        add: jest.fn().mockResolvedValue({ id: 'competition-id' }),
        get: jest.fn(),
          doc: jest.fn().mockReturnValue({
            get: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          })
      }),
      batch: jest.fn().mockReturnValue({
        commit: jest.fn().mockResolvedValue(),
        delete: jest.fn().mockResolvedValue(),
      }
      )
    },

  };
});

//Mock query return for getCompetitions
const mockQuerySnapshot = {
  docs: [
    {
      id: "competition-1",
      data: () => ({
        compname: "Competition 1",
        compdesc: "A competition",
        numteams: 10,
        regstartdate: "2022-05-01",
        regenddate: "2022-05-10",
        compdate: "2022-06-01",
        min_teamsize: 2,
        max_teamsize: 5,
        num_tests: 6,
        admin: "admin-1",
        teams: ["abcdef", "efgh", "pqrstuv"]
      })
    },
    {
      id: "competition-2",
      data: () => ({
        compname: "Competition 2",
        compdesc: "Another competition",
        numteams: 5,
        regstartdate: "2022-05-10",
        regenddate: "2022-05-20",
        compdate: "2022-06-10",
        min_teamsize: 3,
        max_teamsize: 6,
        num_tests: 6,
        admin: "admin-2",
        teams: []
      })
    }
  ]
};

/** TEST CREATE COMPETITION */
describe('createCompetition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should create a competition successfully', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        uid: 'admin-id',
        compname: 'Test Competition',
        compdesc: 'A test competition',
        regstartdate: '2023-05-01',
        regenddate: '2023-05-10',
        compdate: '2023-06-01',
        compenddate: '2023-06-01',
        max_teamsize: 5,
        numteams: 10,
        num_tests: 6,
        min_teamsize: 2,
        image: "myimage.png"
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    // Call the function
    await createCompetition(req, res);

    // Expect the Firestore methods to be called with the correct arguments
    expect(db.collection).toHaveBeenCalledWith('Competitions');
    expect(db.collection().add).toHaveBeenCalledWith({
      admin: 'admin-id',
      compname: 'Test Competition',
      compdesc: 'A test competition',
      regstartdate: '2023-05-01',
      regenddate: '2023-05-10',
      compdate: '2023-06-01',
      compenddate: '2023-06-01',
      max_teamsize: 5,
      numteams: 10,
      num_tests: 6,
      min_teamsize: 2,
      image: "myimage.png",
      teams: [],
    });

    // Expect the response to have a 200 status and the competition ID
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ compid: 'competition-id' });
  }); 

  it("should return an error on failure", async () => {
    const req = {
      body: {
        uid: 'admin-id',
        compname: 'Test Competition',
        compdesc: 'A test competition',
        regstartdate: '2023-05-01',
        regenddate: '2023-05-10',
        compdate: '2023-06-01',
        compenddate: '2023-06-01',
        image: "myimage.png",
        max_teamsize: 5,
        numteams: 10,
        num_tests: 6,
        min_teamsize: 2,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    db.collection().add.mockRejectedValueOnce(new Error("Unsuccessful"));

    await createCompetition(req, res);

    expect(db.collection().add).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Unsuccessful")
  })
});

/** TEST GETTING ALL COMPETITIONS DATA */
describe("getCompetitions function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should handle database errors and return a 400 status with an error message", async () => {
    jest.clearAllMocks();
    const req = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const errorMessage = "Database error";
    const mockCollectionRef = db.collection("Competitions");
    mockCollectionRef.get.mockRejectedValueOnce(new Error(errorMessage));

    await getCompetitions(req, mockRes);
  
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(mockCollectionRef.get).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(errorMessage);
  });

  it("should return a list of competitions with their data and IDs", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const mockCollectionRef = db.collection('Competitions');
    mockCollectionRef.get.mockResolvedValue(mockQuerySnapshot);
    await getCompetitions(req, res);
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        id: "competition-1",
        data: {
          compname: "Competition 1",
          compdesc: "A competition",
          numteams: 10,
          regstartdate: "2022-05-01",
          regenddate: "2022-05-10",
          compdate: "2022-06-01",
          min_teamsize: 2,
          max_teamsize: 5,
          num_tests: 6,
          admin: "admin-1",
          teams: ["abcdef", "efgh", "pqrstuv"]
        }
      },
      {
        id: "competition-2",
        data: {
          compname: "Competition 2",
          compdesc: "Another competition",
          numteams: 5,
          regstartdate: "2022-05-10",
          regenddate: "2022-05-20",
          compdate: "2022-06-10",
          min_teamsize: 3,
          max_teamsize: 6,
          num_tests: 6,
          admin: "admin-2",
          teams: []
        }
      }
    ]);
  });
});
/**Retrieve all user specific competitions **/

describe("getUserCompetitions function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should return a list of user-specific competitions with their data", async () => {
    const req = {body : {uid: "me-id"}};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    
      const mockTeams = 
      { docs :[
        {
            id: "team-a",
            data: () => ({
                teamname: "a",
                teamCode: "1234",
                members: [db.collection("Users").doc("me-id"), db.collection("Users").doc("kirti-id")]
            }
            )
        },
        {
            id: "team-b",
            data: () => ({
                teamname: "b",
                teamCode: "cdef",
                members: [db.collection("Users").doc("me-id")]
            }
            )
        }]}

      const mockComp1 = {docs : [
        {
          id: "competition-1",
          data: {
            compname: "Competition 1",
            compdesc: "A competition",
            numteams: 10,
            regstartdate: "2022-05-01",
            regenddate: "2022-05-10",
            compdate: "2022-06-01",
            min_teamsize: 2,
            max_teamsize: 5,
            num_tests: 6,
            admin: "admin-1",
            teams: ["abcdef", "team-a", "pqrstuv"]
          }
        }
      ]}

      const mockComp2 = {docs: [
    
          {id: "competition-2",
          data: {
            compname: "Competition 2",
            compdesc: "Another competition",
            numteams: 5,
            regstartdate: "2022-05-10",
            regenddate: "2022-05-20",
            compdate: "2022-06-10",
            min_teamsize: 3,
            max_teamsize: 6,
            num_tests: 6,
            admin: "admin-2",
            teams: ["team-b"]
          }} 
        ]
      }


    const mockCollectionRef = db.collection('Teams');
    mockCollectionRef.where("members", "array-contains", db.collection("Users").doc("me")).get.mockResolvedValueOnce(mockTeams);
    db.collection("Competitions").where("teams", "array-contains", mockCollectionRef.doc("team-a")).get.mockResolvedValueOnce(mockComp1)
    db.collection("Competitions").where("teams", "array-contains", mockCollectionRef.doc("team-b")).get.mockResolvedValueOnce(mockComp2)

    await getUserCompetitions(req, res);
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().where).toHaveBeenCalledTimes(6);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      "competition-1", "competition-2"
    ]);
  });
});




/**Get competitions function testing */

describe("getCompetition function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return competitions data with status 200 for valid competition id", async () => {
    const mockSnapshot = {
      id: "competition-1",
      data: () => ({
        compname: "Competition 1",
        compdesc: "A competition",
        numteams: 10,
        regstartdate: "2022-05-01",
        regenddate: "2022-05-10",
        compdate: "2022-06-01",
        min_teamsize: 2,
        max_teamsize: 5,
        admin: "admin-1",
        teams: []
      })
    }
    const req = {body: {
      compid: "competition-1"
    }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    mockCollectionDoc.get.mockResolvedValue(mockSnapshot);
    await getCompetition(req, res);
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
    expect(db.collection().doc().get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "competition-1",
      data:  {
        compname: "Competition 1",
        compdesc: "A competition",
        numteams: 10,
        regstartdate: "2022-05-01",
        regenddate: "2022-05-10",
        compdate: "2022-06-01",
        min_teamsize: 2,
        max_teamsize: 5,
        admin: "admin-1",
        teams: []
      }});

  })

  it("should return an error with status 200 for invalid competition id", async () => {
    const req = {body: {
      compid: undefined
    }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const errorMessage = "Invalid competition"
    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    mockCollectionDoc.get.mockRejectedValueOnce(new Error(errorMessage));
    await getCompetition(req, res);
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
    expect(db.collection().doc().get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);

  })
})

/** Testing functions update */

describe("updateCompetitions function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should correctly update the competition", async () => {
    //mock Competition update
    const req = {
      body: {
        compid: 'competitionId',
        compname: 'New Competition Name',
        compdesc: 'New Competition Description',
        regstartdate: '2023-05-01',
        regenddate: '2023-05-10',
        compdate: '2023-05-15',
        max_teamsize: 5,
        numteams: 20,
        min_teamsize: 1,
      },
    };

    //mock response
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    mockCollectionDoc.update.mockResolvedValue();

    //Call update function on mocked data

    await updateCompetition(req, res);

    expect(db.collection).toHaveBeenCalledWith("Competitions"); // competition data updated
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid); 

    // Expect correct update with all passed parameters

    expect(db.collection().doc().update).toHaveBeenCalledWith({
      compname: 'New Competition Name',
      compdesc: 'New Competition Description',
      regstartdate: '2023-05-01',
      regenddate: '2023-05-10',
      compdate: '2023-05-15',
      max_teamsize: 5,
      numteams: 20,
      min_teamsize: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Successfully updated competition data");
  });

  it("should return error message with status 400 if error", async () => {
    const req = {body: {
      compid: "invalid"
    }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const errorMessage = "Unexpected error"
    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    mockCollectionDoc.update.mockRejectedValueOnce(new Error(errorMessage));
    await updateCompetition(req, res);
    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
    expect(db.collection().doc().update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);

  });
});

/** TEST DELETE COMPETITIONS */

describe("deleteCompetitions function", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete competition and all teams registered in it", async () => {
    const mockSnapshot = {
      id: "competition-1",
      data: () => ({
        compname: "Competition 1",
        compdesc: "A competition",
        numteams: 10,
        regstartdate: "2022-05-01",
        regenddate: "2022-05-10",
        compdate: "2022-06-01",
        min_teamsize: 2,
        max_teamsize: 5,
        admin: "admin-1",
        teams: ["a", "b", "c", "d"]
      })
    }
    const req = {body: {
      compid: "competition-1"
    }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };


    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    mockCollectionDoc.get.mockResolvedValue(mockSnapshot);
    mockCollectionDoc.delete.mockResolvedValue();

    await deleteCompetition(req, res);

    expect(db.collection).toHaveBeenCalledWith("Competitions"); //Retrieves competition data
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
    expect(db.batch).toHaveBeenCalled(); // Create batch delete
    expect(db.batch).toHaveBeenCalled(); 
    expect(db.batch().commit).toHaveBeenCalled();
    expect(db.batch().delete).toHaveBeenCalledTimes(mockSnapshot.data().teams.length); // Delete all teams in competition
    expect(db.collection().doc().delete).toHaveBeenCalled();  //Delete competition document
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Successfully deleted competition");
  });

  it("should return error message with status 400 if error", async () => {
    const req = {body: {
      compid: "invalid"
    }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const errorMessage = "Invalid access";
    const mockCollectionRef = db.collection('Competitions');
    const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
    
    mockCollectionDoc.get.mockRejectedValueOnce(new Error(errorMessage));

    await deleteCompetition(req, res);

    expect(db.collection).toHaveBeenCalledWith("Competitions");
    expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
    expect(db.collection().doc().get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);

  });
})
