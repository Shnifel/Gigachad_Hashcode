import axios from "axios";

export const addSubmission = async(inputs) => {
    const res = await axios.post("/submissions/addSubmission", inputs)
    return res.data;
}

export const getSubmissions = async(inputs) => {
    const res = await axios.post("/submissions/getSubmissions", inputs)
    return res.data;
}