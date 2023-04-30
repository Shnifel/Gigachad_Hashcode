import axios from "axios";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

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

export const downloadCompetitionProblem = (path) => {
    return new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, path);
        getDownloadURL(storageRef)
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
  
            xhr.onload = (event) => {
              const blob = xhr.response;
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = (e) => {
                resolve(e.target.result);
              };
            };
  
            xhr.onerror = (error) => {
              reject(error);
            };
  
            xhr.open('GET', url);
            xhr.send();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  