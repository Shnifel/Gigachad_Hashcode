import mysql from "mysql";

// Exports database object to be used for querying
export const db = mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    user: "sql12607207",
    password: "VRKw72eDpy",
    database: "sql12607207",
    port: 3306,
})