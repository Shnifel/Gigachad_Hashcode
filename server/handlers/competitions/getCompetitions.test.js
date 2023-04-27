import { getCompetitions, getCompetition, updateCompetition } from "./competitions";
import { db } from '../../database/firebase.js';

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
          admin: "admin-1",
          teams: []
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
          admin: "admin-2",
          teams: []
        })
      }
    ]
  };
  

  jest.mock('../../database/firebase.js', () => {
    return {
      db: {
        collection: jest.fn().mockReturnValue({
          get: jest.fn(),
          doc: jest.fn().mockReturnValue({
            get: jest.fn(),
            update: jest.fn()
          })
        }),
      },
    };
  });

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
            admin: "admin-1",
            teams: []
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
            admin: "admin-2",
            teams: []
          }
        }
      ]);
    });
  });

  //**Get competitions function testing */

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
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockCollectionRef = db.collection('Competitions');
      const mockCollectionDoc = mockCollectionRef.doc(req.body.compid);
      mockCollectionDoc.update.mockResolvedValue();
      await updateCompetition(req, res);
      expect(db.collection).toHaveBeenCalledWith("Competitions");
      expect(db.collection().doc).toHaveBeenCalledWith(req.body.compid);
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
    })
  })

