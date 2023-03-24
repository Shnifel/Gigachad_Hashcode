import {db} from "../../database/dbConnection.js"; // Database for querying
import bcrypt from "bcryptjs"; // Used for password hashing
import  {OAuth2Client} from "google-auth-library"; // API for Google Sign In
import jwt from "jsonwebtoken"; // For generating cookies 

// Server side key used to access google auth services
const google_access_token = '706697422532-7dr63k4qq2a7m7t98v4fvt2698r7bf8n.apps.googleusercontent.com'


// Setup google client with access token
const client = new OAuth2Client(google_access_token);

export const googleSignIn = async (req, res) => {

    // Extract user token id from google token object in request body
    const token = req.body.tokenObj.id_token;

    // Verify token id obtained in request body is indeed valid
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: google_access_token,
        });

        // Success ! Token verified and user information from google obtained
        // Extract relevant information from ticket payload

        const payload = ticket.getPayload();
        const userId = payload["sub"];
        const name = payload["name"];
        const email = payload["email"];

        // Query whether user/email exists in our database - has to have been registered
        const query = "";

        db.query(query, [name, email, userId], (err, data) => {
            if (err) return res.json(err);

            // If user exists extract emailVerified or not, if not verified set user to verified / we can trust Google's authentication

            return res.status(200).json("Verified, logged in successfully !");
        })
    }
    catch (error){
        // Token passed to server was invalidated through google

        console.log(error);
        res.status(401).send("Unauthorized");
    }
}


export const login = async (req, res) => {

    // From request body extract all login details and query database for such a user
    const query = "";
    db.query(query, [req.body.name, req.body.surname], (err,data) =>{
        if (err) {return res.json(err);} // A server side error has occurred
        if (!data.length) {return res.status(404).json("No such user found");} // No such user, return user not found

        //Found user in data set

        // Compare sync of given user password and hashed database password
        const passCorrect = bcrypt.compareSync(req.body.password, data[0].PASSWORD);
        const emailVerified = data[0].EMAIL_VERIFIED;

        // Error handling - incorrect password or unverified email
        if (!passCorrect) { return res.status(400).json("Incorrect password");}
        if (!emailVerified) { return res.status(400).json("Please verify your email before logging in")};

        const {PASSWORD, ...other} = data[0];// Remove password from stored information from user
        const token = jwt.sign({email: data[0].EMAIL}, "key"); // Create a jsonwebtoken for user's email with given cookie

        return res.cookie("access_token", token, {httpOnly : true}).status(200).json(other); // Send cookie file to user's browser to stay logged in
    })


};