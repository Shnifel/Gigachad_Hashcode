import { db } from "../../database/firebase.js";
import { updateProfile } from "./updateProfile.js";

jest.mock("../../database/firebase.js");
jest.mock("../../database/firebase.js", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    update: jest.fn(),
  },
}));

describe("should successfully update user details", () => {
    it("should return user details for valid user", async () => {
        const req = {body: {
            uid: "123",
            image: "my-image-url"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await updateProfile(req, res);

        expect(db.collection).toHaveBeenCalledWith("Users");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.uid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Successfully updated your details");
    })


    it("should return error for invalid user update - firebase error", async () => {
        const req = {body: {
            uid: "123",
            image: "my-image-url"
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        db.collection("Users").doc(req.body.uid).update.mockRejectedValueOnce(new Error("Firebase/user-not-found"))

        await updateProfile(req, res);

        expect(db.collection).toHaveBeenCalledWith("Users");
        expect(db.collection().doc).toHaveBeenCalledWith(req.body.uid);
        expect(db.collection().doc().update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Firebase/user-not-found");
    })
})