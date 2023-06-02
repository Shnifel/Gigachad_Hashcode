import axios from "axios";
const baseurl="https://smiling-bass-train.cyclic.app/server"
//Posting a submission to be added
export const addSubmission = async(inputs) => {
    const res = await axios.post(baseurl + "/submissions/addSubmission", inputs)
    return res.data;
}
//Posting to retrieve a submission
export const getSubmissions = async(inputs) => {
    const res = await axios.post(baseurl + "/submissions/getSubmissions", inputs)
    return res.data;
}
//Posting to retrieve the leaderboard
export const getLeaderboard = async(inputs) => {
    const res = await axios.post(baseurl + "/leaderboard", inputs)
    return res.data;
}
//Posting to retrieve all the
export const getAllSubmissions = async(inputs) => {
    const res = await axios.post(baseurl + "/submissions/getAllSubmissions", inputs)
    return res.data
}