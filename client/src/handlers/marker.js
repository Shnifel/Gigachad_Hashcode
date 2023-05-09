import axios from "axios";

export const markFile = async(inputs) => {
    const response = await axios.post("/marker/markFile", inputs);
    return response.data;
}