import { getCompetitions } from "./competitions";
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
          get: jest.fn()
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