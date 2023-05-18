import { db } from "../../database/firebase.js";
import { login } from "./login.js";

jest.mock("../../database/firebase.js");
jest.mock("../../database/firebase.js", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
  },
}));

describe("login retrieve user details", () => {
    it("should return user details for valid user", async () => {
        const req = {body: {
            uid: "123",
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const mockData = {
            data: () => ({
                Name: "Username",
                Surname: "Surname",
                Email: "User@gmail.com",
            })
        }

        db.collection("Users").doc(req.body.uid).get.mockReturnValueOnce(mockData)

        await login(req, res);

        expect(db.collection).toHaveBeenCalledWith("Users");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.uid);
        expect(db.collection().doc().get).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData.data());

       
    })

    it("should return error for invalid user", async () => {
        const req = {body: {
            uid: "123",
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        db.collection("Users").doc(req.body.uid).get.mockRejectedValueOnce(new Error("Firebase/user-not-found"))

        await login(req, res);

        expect(db.collection).toHaveBeenCalledWith("Users");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.uid);
        expect(db.collection().doc().get).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Firebase/user-not-found");

       
    })
})