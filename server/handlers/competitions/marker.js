import { db, bucket } from "../../database/firebase.js";
import { spawn } from "child_process";

const downloadFile = async (path) => {
    try {
        //Doc cloud storage file
        const file = bucket.file(path);
    //Download File for given path   
    const [data] = await file.download();
    return data;
    } catch (error) {
        //Throw Error for invalid File Path
        throw new Error(error.message);
    }
    
}

export const markFile = (markerPath, testPath, test_case) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Download Marker File and User Solution
      const markerFile = await downloadFile(markerPath);
      const subFile = await downloadFile(testPath);
      //Run Python File on Solution File and TestCase Number
      //Will execute as: python marker.py test_case subfilecontents.txt
      let pythonProcess;
      try {
        pythonProcess = spawn('python', ['-c', markerFile.toString(), test_case, subFile.toString()])
      } catch (error) {
        reject(error)
      }

      let output = '';
      //Python Program successful, we obtain output
      pythonProcess.stdout.on('data', data => {
        output = data.toString();
      });
      //Python Program failed, throw error
      pythonProcess.stderr.on("error", err => {
        reject(new Error(err));
      });
      //Timeout on Python process to ensure it does not run infinitly
      const timeout = setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('Marking timed out after 1s'));
      }, 1000);
      //Check Terminal Python Process
      pythonProcess.on('close', (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error('An error has occurred'));
        } else {
          //Return Score
          resolve(output);
        }
      });

      

    } catch (error) {
      reject(error);
    }
  });
};

