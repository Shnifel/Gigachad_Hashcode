import axios from "axios";
//Posting a file to be marked
export const markFile = async(inputs) => {
    const response = await axios.post("/marker/markFile", inputs);
    return response.data;
}