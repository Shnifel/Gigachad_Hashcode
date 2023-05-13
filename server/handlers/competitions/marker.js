import { db, bucket } from "../../database/firebase.js";
import crypto from "crypto";
import { Admin } from "../../database/firebase.js";
import { spawn } from "child_process";

const downloadFile = async (path) => {
    try {
        const file = bucket.file(path);
    const [data] = await file.download();
    return data;
    } catch (error) {
        console.log(error.message)
    }
    
}

export const markFile = (markerPath, testPath, test_case) => {
  return new Promise(async (resolve, reject) => {
    try {
      const markerFile = await downloadFile(markerPath);
      const subFile = await downloadFile(testPath);

      let pythonProcess;
      try {
        pythonProcess = spawn('python', ['-c', markerFile.toString(), test_case, subFile.toString()])
      } catch (error) {
        console.log(error.message)
        reject(error)
      }
      

      console.log("Here")

      let output = '';
      pythonProcess.stdout.on('data', data => {
        console.log(output)
        output = data.toString();
      });

      pythonProcess.stderr.on("error", err => {
        console.log(err)
        reject(err);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}`));
        } else {
          resolve(output);
        }
      });

    } catch (error) {
      console.log(error.message)
      reject(error);
    }
  });
};
