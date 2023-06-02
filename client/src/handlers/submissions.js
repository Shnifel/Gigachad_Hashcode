import axios from "axios";
//Posting a submission to be added
export const addSubmission = async(inputs) => {
    const res = await axios.post("/submissions/addSubmission", inputs)
    return res.data;
}
//Posting to retrieve a submission
export const getSubmissions = async(inputs) => {
    const res = await axios.post("/submissions/getSubmissions", inputs)
    return res.data;
}
//Posting to retrieve the leaderboard
export const getLeaderboard = async(inputs) => {
    const res = await axios.post("/leaderboard", inputs)
    return res.data;
}
//Posting to retrieve all the submissions
export const getAllSubmissions = async(inputs) => {
    const res = await axios.post("/submissions/getAllSubmissions", inputs)
    return res.data
}