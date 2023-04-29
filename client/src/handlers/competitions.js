
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
    const response = await axios.post("/teams/createTeams",inputs); 
    return response.data;

}

export const joinTeams = async(inputs) => {
    const response = await axios.post("/teams/joinTeams",inputs); 
    return response.data;
}

export const getTeams = async(inputs) => {
    const response = await axios.post("/teams/getTeams", inputs);
    return response.data;
}


export const getTeam = async(inputs) => {
    const response = await axios.post("/teams/getTeam", inputs);
    return response.data;
}

export const removeMember = async(inputs) => {
    const response = await axios.post("/teams/removeMember", inputs);
}
