import axios from "axios";
import { storage } from "../Firebase";
import { ref, uploadBytes } from "firebase/storage"

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

export const deleteTeam = async(inputs) => {
    const response = await axios.post("/teams/deleteTeam", inputs);
}

export const updateTeam = async(inputs) => {
    const response = await axios.post("/teams/updateTeam", inputs);
}

export const uploadCompetitionProblem = async(file) => {
    try {
        const storageRef = ref(storage, "problems/test.pdf")
    
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log(snapshot.metadata.fullPath);
            console.log('Uploaded a blob or file!');
          })
      } catch (error) {
        // Handle any error
        console.log(error.message);
        throw new Error('Error uploading file to Firebase Storage');
      }
}
