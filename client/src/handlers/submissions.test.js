import axios from "axios";
import {
    addSubmission, getSubmissions
} from "./submissions.js";

const baseurl="https://smiling-bass-train.cyclic.app/server"

jest.mock("axios");
jest.mock("firebase/storage", () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));
jest.mock("../Firebase", () => ({
  storage: jest.fn(),
}));

describe("API Functions", () => {
  describe("addSubmission", () => {
    it("sends a request to make user submission", async () => {
      const mockInputs = { subsid: "abcde", testcase : "4"};
      const mockResponse = { score: 40 };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await addSubmission(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/submissions/addSubmission",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

});