import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";
import { getLeaderboard } from "./leaderboard.js"; 

// Mock dependencies
jest.mock("../../database/firebase.js");
jest.mock("../../database/firebase.js", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
  },
}));

describe("getLeaderboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return leaderboard data", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        compid: "competition-id",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the competition data
    const compData = {
      teams: [
        db.doc("team1"),
        db.doc("team2"),
      ],
    };
    db.collection().doc().get.mockResolvedValueOnce({ data: () => compData });

    // Mock the team data and submission scores
    const team1Data = {
      subsRef: "team1-subs",
      teamname: "team-1",
    };
    const team2Data = {
      subsRef: "team2-subs",
      teamname: 'team-2'
    };
    const team1SubScores = { max_scores: [0, 0, 100] };
    const team2SubScores = { max_scores: [1, 76, 200] };
    db.doc("team1").get.mockResolvedValueOnce({ id: "team1", data: () => team1Data });
    db.doc("team2").get.mockResolvedValueOnce({ id: "team2", data: () => team2Data });
    db.collection("Submissions").doc("team1-subs").get.mockResolvedValueOnce({ data: () => ({ max_scores: team1SubScores }) });
    db.collection("Submissions").doc("team2-subs").get.mockResolvedValueOnce({ data: () => ({ max_scores: team2SubScores }) });

    // Call the function under test
    await getLeaderboard(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "team1", teamname: "team-1", scores: team1SubScores },
      { id: "team2", teamname: "team-2", scores: team2SubScores },
    ]);
  });

  it("should handle error when retrieving competition data", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        compid: "competition-id",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the error when retrieving competition data
    db.collection().doc().get.mockRejectedValue(new Error("Error retrieving competition data"));

    // Call the function under test
    await getLeaderboard(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Error retrieving competition data");
  });
});
