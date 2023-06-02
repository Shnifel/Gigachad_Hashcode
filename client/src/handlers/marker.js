import axios from "axios";
const baseurl="https://smiling-bass-train.cyclic.app/server"
//Posting a file to be marked
export const markFile = async(inputs) => {
    const response = await axios.post(baseurl + "/marker/markFile", inputs);
    return response.data;
}