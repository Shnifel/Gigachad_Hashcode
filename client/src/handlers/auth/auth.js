import axios from "axios";

export const loginHandler = async (inputs) => {
    const response = await axios.post("/auth/login", inputs); 
    return response.data;
}


export const googleAuth = async (response) => {
    const res = await axios.post("/auth/googleSignIn", response);
    return res.data;
}

export const registerHandler = async (inputs) => {
    const response = await axios.post("/auth/register", inputs); 
    return response.data;
}
