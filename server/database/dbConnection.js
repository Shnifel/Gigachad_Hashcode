import mysql from "mysql";

// Exports database object to be used for querying

/**
 * @returns {any} Database object that will be used to query from the database
 */
export const db = mysql.createPool({
    host:"sql12.freesqldatabase.com",
    user: "sql12607207",
    password: "VRKw72eDpy",
    database: "sql12607207",
    port: 3306,
})