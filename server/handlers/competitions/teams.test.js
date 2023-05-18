import { db } from "../../database/firebase.js";
import { getTeams, getTeam, createTeams, joinTeam, deleteMember, deleteTeam, updateTeam } from "./teams.js";

//Mocking the database object
jest.mock('../../database/firebase.js', () => {
    return {
      db: {
        collection: jest.fn().mockReturnValue({
          add: jest.fn().mockResolvedValue({ id: 'competition-id' }),
          get: jest.fn(),
            doc: jest.fn().mockReturnValue({
              id: "luke-id",
              get: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            }),
          where: jest.fn().mockReturnValue({
            get: jest.fn()
          })
            
        }),
        batch: jest.fn().mockReturnValue({
          commit: jest.fn().mockResolvedValue(),
          delete: jest.fn().mockResolvedValue(),
        }
        )
      },
     Admin : {
        firestore:{
            FieldValue:{
                arrayUnion: jest.fn().mockResolvedValue(),
                arrayRemove: jest.fn().mockResolvedValue()
            }
        }
            

     }
  
    };
});

//Mock firestore objects
const mockSnapshot = {
    id: "competition-1",
    data: () => ({
      numteams: 10,
      min_teamsize: 2,
      max_teamsize: 5,
      num_tests: 8,
      teams: [db.collection("Teams").doc("team-a"), db.collection("Teams").doc("team-b")]
    })
};

const mockTeamSnapshots = [
{
    id: "team-a",
    data: () => ({
        teamname: "a",
        teamCode: "1234",
        members: [db.collection("Users").doc("luke-id"), db.collection("Users").doc("kirti-id")]
    }
    )
},
{
    id: "team-b",
    data: () => ({
        teamname: "b",
        teamCode: "cdef",
        members: [db.collection("Users").doc("msg-id")]
    }
    )
}]

const mockMembers = [
    {
        id: "luke-id",
        data: () => ({
            name: "Luke",
            surname: "Kerker",
            email: "lk@gmail.com",
            isAdmin: true
        })
    },
    {
        id: "kirti-id",
        data: () => ({
            name: "Kirti",
            surname: "Patel",
            email: "kp@gmail.com",
            isAdmin: true
        })
    },
    {
        id: "msg-id",
        data: () => ({
            name: "Muhammad",
            surname: "Goolam",
            email: "msg@gmail.com",
            isAdmin: false
        })
    }
]



describe("getTeams function - retrieve teams data for given competition", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should obtain all teams and members data for given competition", async () => {
        const req = {body: {
         compid: "competition-1"
        }};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);

        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);
        db.collection("Users").doc("luke-id").get.mockResolvedValueOnce(mockMembers[0]);
        db.collection("Users").doc("kirti-id").get.mockResolvedValueOnce(mockMembers[1]);
        db.collection("Users").doc("msg-id").get.mockResolvedValueOnce(mockMembers[2]);

        await getTeams(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(db.collection("Teams").doc().get).toHaveBeenCalledTimes(6);
        expect(res.json).toHaveBeenCalledWith([
        {"id": "team-a", "members": [{"email": "lk@gmail.com", "id": "luke-id", "isAdmin": true, "name": "Luke", "surname": "Kerker"}, 
                     {"email": "kp@gmail.com", "id": "kirti-id", "isAdmin": true, "name": "Kirti", "surname": "Patel"}], 
         "teamData": {"teamCode": "1234", "teamname": "a"}}, 
        {"id": "team-b", "members": [{"email": "msg@gmail.com", "id": "msg-id", "isAdmin": false, "name": "Muhammad", "surname": "Goolam"}],
         "teamData": {"teamCode": "cdef", "teamname": "b"}}] )
    });

    it("should return error when firebase fails to find competiiton", async () =>{
        const req = {body: {
            compid: "invalid"
           }};
           const res = {
             status: jest.fn().mockReturnThis(),
             json: jest.fn().mockReturnThis()
           };
        
        const errorMessage = "Competition not found"
        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockRejectedValueOnce(new Error(errorMessage));

        await getTeams(req, res);
        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(errorMessage);

    })
})


describe("getTeam function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should obtain all teams and members data for given competition", async () => {
        const req = {body: {
         compid: "competition-1",
         uid: "luke-id"
        }};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);

        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]); 
        db.collection("Users").doc("luke-id").get.mockResolvedValueOnce(mockMembers[0]);
        db.collection("Users").doc("kirti-id").get.mockResolvedValueOnce(mockMembers[1]);
       
        await getTeam(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.json).toHaveBeenCalledWith(
        {"id": "team-a", 
        "membersData": [{"email": "lk@gmail.com", "id": "luke-id", "isAdmin": true, "name": "Luke", "surname": "Kerker"},
                        {"email": "kp@gmail.com", "id": "kirti-id", "isAdmin": true, "name": "Kirti", "surname": "Patel"}], 
        "teamData": {"teamCode": "1234", "teamname": "a"}})
    });

    it("should return error when firebase fails to find competiiton", async () =>{
        const req = {body: {
            compid: "invalid",
            uid: "msg-id"
           }};
           const res = {
             status: jest.fn().mockReturnThis(),
             json: jest.fn().mockReturnThis()
           };
        
        const errorMessage = "Competition not found"
        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockRejectedValueOnce(new Error(errorMessage));

        await getTeam(req, res);
        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    it("should return not registered status 400 if user is not registered in competition", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "blah"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        
        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);
    

        await getTeam(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("You are not registered in this competition");
    })
})


/** CREATE NEW TEAM */
describe("createTeam function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create new team with unique team name", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "random-id",
            teamname: "team-c"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);
        db.collection("Competitions").add.mockResolvedValue({id: "new-id"});

        await createTeams(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(db.collection().add).toHaveBeenCalled();
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should give non-unique name error", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "random-id",
            teamname: "b"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);

        await createTeams(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Team name is already taken, please choose a different one");
    });

    it("should give status 400 already registered in a team", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "luke-id",
            teamname: "b"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);

        await createTeams(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("You are already registered in a team in this competition");
    });
});

/** JOIN TEAM TEST */
describe("joinTeam function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should add unregistered member to team", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "random-id",
            teamCode: "1234"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);
        db.collection("Teams").where().get.mockResolvedValueOnce({
            docs:[
                {
                    id: "team-a",
                    data: () => ({
                        teamname: "a",
                        teamCode: "1234",
                        members: [db.collection("Users").doc("luke-id"), db.collection("Users").doc("kirti-id")]
                    }
                    )
                }
            ]
        });

        await joinTeam(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Succesfully joined team");
    });

    it("should give error status 400 invalid code", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "random-id",
            teamCode: "123"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);
        db.collection("Teams").doc("team-b").get.mockResolvedValueOnce(mockTeamSnapshots[1]);
        db.collection("Teams").where().get.mockResolvedValueOnce({empty: true});

        await joinTeam(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith("No such team found");
    });

    it("should give status 400 already in team error for member registered", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "luke-id",
            teamCode: "123"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockResolvedValueOnce(mockSnapshot);
        db.collection("Teams").doc("team-a").get.mockResolvedValueOnce(mockTeamSnapshots[0]);

        await joinTeam(req, res);

        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("You are already registered in a team in this competition");
    });

    it("should return error when firebase fails to find competiiton", async () =>{
        const req = {body: {
            compid: "competition-1",
            uid: "luke-id",
            teamCode: "123"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        
        const errorMessage = "Competition not found"
        const mockCollectionRef = db.collection('Competitions');
        const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
        mockCollectionDoc.get.mockRejectedValueOnce(new Error(errorMessage));

        await joinTeam(req, res);
        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Failed to join team");
    });
})

/** DELETE MEMBER FROM TEAM */
describe("deleteMember function", () => {
    it("should remove member from team", async () => {
        const req = {body: {
            compid: "competition-1",
            uid: "luke-id",
            teamCode: "123"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await deleteMember(req, res);
        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Successfully removed member");
        expect(res.status).toHaveBeenCalled();
    })
})

describe("deleteTeam function", () => {
    it ("should delete team from competitions", async () => {
        const req = {body: {
            compid: "competition-1",
            uid: "luke-id",
            teamCode: "123"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };


        await deleteTeam(req, res);
        expect(db.collection).toHaveBeenCalledWith("Competitions");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Successfully deleted team");
        expect(res.status).toHaveBeenCalled();
    })
} )

describe("updateTeam function", () => {
    it ("should update team detail for competition", async () => {
        const req = {body: {
            teamid: "123",
            teamname: "New team name"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await updateTeam(req, res);
        expect(db.collection).toHaveBeenCalledWith("Teams");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.teamid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Successfully updated team");
        expect(res.status).toHaveBeenCalled();
    })

    it ("should return an error for team update", async () => {
        const req = {body: {
            teamid: "123",
            teamname: "New team name"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        db.collection("Teams").doc(req.body.teamid).update.mockRejectedValueOnce(new Error("Invalid team update"))

        await updateTeam(req, res);
        expect(db.collection).toHaveBeenCalledWith("Teams");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.teamid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("An unexpected error has occurred");
        expect(res.status).toHaveBeenCalled();
    })
} )

  