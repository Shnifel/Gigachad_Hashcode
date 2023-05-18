import { db, bucket } from "../../database/firebase.js";
import { Admin } from "../../database/firebase.js";
import { addSubmission, getSubmissions } from "./submissions.js"; 
import { markFile } from "./marker.js";

// Mock dependencies
jest.mock("../../database/firebase.js");
jest.mock("../../database/firebase.js", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    update: jest.fn(),
  },
  Admin : {
    firestore:{
        FieldValue:{
            arrayUnion: jest.fn().mockResolvedValue(),
            arrayRemove: jest.fn().mockResolvedValue()
        }
    }
        

 }
}));
jest.mock("./marker.js", () => ({
  markFile: jest.fn(),
}));

describe("addSubmission", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add submission and return feedback", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsid: "submission-id",
        compid: "competition-id",
        test_case: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the submission data
    const submissionData = {
      max_scores: [0, 0, 0], // Assuming 3 test cases
    };
    db.collection().doc().get.mockResolvedValue({ data: () => submissionData });

    // Mock the markFile function
    const feedback = "-1";
    markFile.mockResolvedValue(feedback);

    // Call the function under test
    await addSubmission(req, res);

    // Assertions
    expect(markFile).toHaveBeenCalledWith(
      "competition-id/marker.py",
      "competition-id/submissions/submission-id/test_case_1.txt",
      1
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedback);

  });

  it("should update max score", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsid: "submission-id",
        compid: "competition-id",
        test_case: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the submission data
    const submissionData = {
      max_scores: [0, 23, 0],
      subs_history: [{time: "2023-05-11 13:00", score: "23",test_case: "1"}] // Assuming 3 test cases
    };
    db.collection().doc().get.mockResolvedValue({ data: () => submissionData });

    // Mock the markFile function
    const feedback = "85";
    markFile.mockResolvedValue(feedback);

    // Call the function under test
    await addSubmission(req, res);

    // Assertions
    expect(markFile).toHaveBeenCalledWith(
      "competition-id/marker.py",
      "competition-id/submissions/submission-id/test_case_1.txt",
      1
    );
    expect(db.collection().doc().update).toHaveBeenCalledTimes(2)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedback);

  });

  it("should handle error in markFile and update submission", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsid: "submission-id",
        compid: "competition-id",
        test_case: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the submission data
    const submissionData = {
      max_scores: [0, 0, 0], // Assuming 3 test cases
    };
    db.collection().doc().get.mockResolvedValue({ data: () => submissionData });

    // Mock the markFile function to throw an error
    const errorMessage = "Error marking file";
    markFile.mockRejectedValue(new Error(errorMessage));

    // Call the function under test
    await addSubmission(req, res);

    // Assertions
    expect(markFile).toHaveBeenCalledWith(
      "competition-id/marker.py",
      "competition-id/submissions/submission-id/test_case_1.txt",
      1
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
    
  });

  it("should handle error in update submission in firestore", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsid: "submission-id",
        compid: "competition-id",
        test_case: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the submission data
    const submissionData = {
      max_scores: [0, 0, 0], // Assuming 3 test cases
    };
    db.collection().doc().get.mockResolvedValueOnce({ data: () => submissionData });

    // Mock the markFile function to throw an error
    const errorMessage = "Error updating file";
    markFile.mockRejectedValue(new Error(errorMessage));

    db.collection().doc().update.mockRejectedValue(new Error(errorMessage))

    // Call the function under test
    await addSubmission(req, res);

    // Assertions
    expect(markFile).toHaveBeenCalledWith(
      "competition-id/marker.py",
      "competition-id/submissions/submission-id/test_case_1.txt",
      1
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
    
  });

  


});

describe("getSubmissions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return submission data", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsRef: "submission-ref",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the submission data
    const submissionData = { /* Your mock submission data here */ };
    db.collection().doc().get.mockResolvedValue({ data: () => submissionData });

    // Call the function under test
    await getSubmissions(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(submissionData);
   
  });

  it("should handle error in retrieving submission data", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        subsRef: "submission-ref",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the error when retrieving submission data
    const errorMessage = "Error retrieving submission data";
    db.collection().doc().get.mockRejectedValue(new Error(errorMessage));

    // Call the function under test
    await getSubmissions(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
   
  });

 
});
