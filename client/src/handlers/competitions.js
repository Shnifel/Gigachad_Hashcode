
import axios from "axios";

export const createNewCompetitions = async(inputs) => {
    const response = await axios.post("/competitions/createCompetition", inputs); 
    return response.data;
}

export const getCompetitions = async() => {
    const response = await axios.post("/competitions/getCompetitions"); 
    return response.data;

}

export const getCompetition = async(inputs) => {
    const response = await axios.post("/competitions/getCompetition", inputs);
    return response.data;
}

export const createTeam = async(inputs) => {
    const response = await axios.post("/competitions/createTeams",inputs); 
    return response.data;

}

export const joinTeams = async(inputs) => {
    const response = await axios.post("/competitions/joinTeams",inputs); 
    return response.data;
}

export const getTeams = async(inputs) => {
    const response = await axios.post("/competitions/getTeams", inputs);
    return response.data;
}


export const getTeam = async(inputs) => {
    const response = await axios.post("/competitions/getTeam", inputs);
    return response.data;
}
