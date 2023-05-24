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

export const getUserCompetitions = async(inputs) => {
  const response = await axios.post("/competitions/getUserCompetitions", inputs);
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
          
          })
      } catch (error) {
        // Handle any error
        throw new Error('Error uploading file to Firebase Storage');
      }
}

export const uploadFile = (path, file) => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, path);
  
      uploadBytes(storageRef, file).then((snapshot) => {
  
        resolve(snapshot); // Resolve the promise with the snapshot
      });
    } catch (error) {
      reject(new Error('Error uploading file to Firebase Storage')); // Reject the promise with the error
    }
  });
};

export const downloadFile = (path) => {
    return new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, path);
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(url)
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
        console.log(error.message);
      }
    });
  };
  