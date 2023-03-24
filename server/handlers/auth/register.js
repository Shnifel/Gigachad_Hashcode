import {db} from "../../database/dbConnection.js"; // Database object for querying
import bcrypt from "bcryptjs"; // bcrypt library for hashing passwords

/**
 * @param {any} req HTTP Request containing user details
 * @param {any} res HTTP Response to be updated to be sent back to user
 * @returns {any} Returns success if registration successful and sends email to client's email address else the corresponding error
 */
export const register = async (req, res) => {

    // Check user existence
    const query = "";
    db.query(query, [req.body.email, req.body.surname], (err, data) => {
        console.log(err);
        if (err) {return res.json(err);} // Return some error
        if (data.length) {return res.status(409).json("User already exists") ;} // Query set contains user with these details invalid registration

        // Generate hashed password to be stored in database
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Generate verification token to be stored along with various details and for email authentication
        const verToken = "";

        // Insert user into database
        const q = "";
        const values = [req.body.name, req.body.surname, hash, req.body.email, verToken];

        db.query(q, [values], (err, data) => {
           if (err) return res.json(err);

           // Succesfully entered user into database - send email to user

           return res.status(200).json("An email has been sent to you. Please verify your email first");
        })

    });
};