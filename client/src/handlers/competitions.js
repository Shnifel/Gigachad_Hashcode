import axios from "axios";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
//Posting to create a new competition
export const createNewCompetitions = async(inputs) => {
    const response = await axios.post("/competitions/createCompetition", inputs); 
    return response.data;
}
//Posting to retrieve all competitions
export const getCompetitions = async() => {
    const response = await axios.post("/competitions/getCompetitions"); 
    return response.data;

}
//Posting to retrieve a specific user's competitions
export const getUserCompetitions = async(inputs) => {
  const response = await axios.post("/competitions/getUserCompetitions", inputs);
  return response.data;
}
//Posting to retrieve a specific competition
export const getCompetition = async(inputs) => {
    const response = await axios.post("/competitions/getCompetition", inputs);
    return response.data;
}
//Posting to delete a compeition
export const deleteCompetition = async(inputs) => {
  const response = await axios.post("/competitions/deleteCompetition", inputs);
  return response.data;
}
//Posting to update a competiton
export const updateCompetition = async(inputs) => {
  const response = await axios.post("/competitions/updateCompetition", inputs);
  return response.data;
}
//Posting to create a team on a competition
export const createTeam = async(inputs) => {
    const response = await axios.post("/teams/createTeams",inputs); 
    return response.data;

}
//Posting to Join a team for a competition
export const joinTeams = async(inputs) => {
    const response = await axios.post("/teams/joinTeams",inputs); 
    return response.data;
}
//Posting to retrieve all teams in a competition
export const getTeams = async(inputs) => {
    const response = await axios.post("/teams/getTeams", inputs);
    return response.data;
}

//Posting to retrieve a specific team in a competition
export const getTeam = async(inputs) => {
    const response = await axios.post("/teams/getTeam", inputs);
    return response.data;
}
//Posting to remove a member from a team
export const removeMember = async(inputs) => {
    const response = await axios.post("/teams/removeMember", inputs);
}
//Posting to delete a team from a competition
export const deleteTeam = async(inputs) => {
    const response = await axios.post("/teams/deleteTeam", inputs);
}
//Posting to Update a team
export const updateTeam = async(inputs) => {
    const response = await axios.post("/teams/updateTeam", inputs);
}
//Handling uploading a competition problem as a pdf
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
//Handling File Uploading for competitions
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
// Retrieving Image from storage
export const getImage = (path) => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, path);

      getDownloadURL(storageRef).then(
        url => {
          resolve(url);
        }
      ).catch(error => reject(error))


    } catch (error) {
      reject(error);
    }
  })
}
//Retrieveing URL from storage
export const getURL= (path) => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, path);

      getDownloadURL(storageRef).then(
        url => {
          resolve(url);
        }
      ).catch(error => reject(error))


    } catch (error) {
      reject(error);
    }
  })
}
//Handling file download
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
  