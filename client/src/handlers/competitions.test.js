import axios from "axios";
import {
  createNewCompetitions,
  getCompetitions,
  getUserCompetitions,
  getCompetition,
  deleteCompetition,
  updateCompetition,
  createTeam,
  joinTeams,
  getTeams,
  getTeam,
  removeMember,
  deleteTeam,
  updateTeam,
  uploadCompetitionProblem,
  uploadFile,
  getImage,
  getURL,
  downloadFile
} from "./competitions.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../Firebase.js";
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
  describe("getUserCompetitions", () => {
    it("sends a request to get user competitions", async () => {
      const mockInputs = { uid: "abcd" };
      const mockResponse = { /* mock response */ };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await getUserCompetitions(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/competitions/getUserCompetitions",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCompetition", () => {
    it("sends a request to get a competition", async () => {
      const mockInputs = {compid: "12345" };
      const mockResponse = { compname: "Hashcode", teams: ["Team1", "Team2"]};
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await getCompetition(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/competitions/getCompetition",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteCompetition", () => {
    it("sends a request to delete a competition", async () => {
      const mockInputs = { compid: "compid" };
      const mockResponse = { message: "Successfully deleted" };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await deleteCompetition(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/competitions/deleteCompetition",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateCompetition", () => {
    it("sends a request to update a competition", async () => {
      const mockInputs = { compstartdate: "2023-05-25T09:34" };
      const mockResponse = {message: "Successfully updated" };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await updateCompetition(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/competitions/updateCompetition",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createTeam", () => {
    it("sends a request to create a team", async () => {
      const mockInputs = { uid: "1234", compid: "6789" };
      const mockResponse = {code: "joinCode1234" };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await createTeam(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl + "/teams/createTeams",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("joinTeams", () => {
    it("sends a request to join teams", async () => {
      const mockInputs = { uid: "1234", joinCode: "joinCode1234", compid: "s2345" };
      const mockResponse = { /* mock response */ };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await joinTeams(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/teams/joinTeams",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTeams", () => {
    it("sends a request to get teams", async () => {
      const mockInputs = { compid : "67890"};
      const mockResponse = [{teamname: "fun", members: [{name: "Person1"}]}];
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await getTeams(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/teams/getTeams",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTeam", () => {
    it("sends a request to get a team", async () => {
      const mockInputs = { /* mock inputs */ };
      const mockResponse = { /* mock response */ };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await getTeam(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/teams/getTeam",
        mockInputs
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("removeMember", () => {
    it("sends a request to remove a team member", async () => {
      const mockInputs = { /* mock inputs */ };

      await removeMember(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl + "/teams/removeMember",
        mockInputs
      );
    });
  });

  describe("deleteTeam", () => {
    it("sends a request to delete a team", async () => {
      const mockInputs = { /* mock inputs */ };

      await deleteTeam(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/teams/deleteTeam",
        mockInputs
      );
    });
  });

  describe("updateTeam", () => {
    it("sends a request to update a team", async () => {
      const mockInputs = { /* mock inputs */ };

      await updateTeam(mockInputs);

      expect(axios.post).toHaveBeenCalledWith(
        baseurl +"/teams/updateTeam",
        mockInputs
      );
    });
  });
});
