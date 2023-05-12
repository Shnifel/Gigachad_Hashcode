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

export const markFile = async(markerPath, testPath, test_case) => {
    try {
      const markerFile = await downloadFile(markerPath);
      const subFile = await downloadFile(testPath);

      const pythonProcess = spawn('python', ['-c', markerFile.toString(), test_case, subFile.toString()]);
      pythonProcess.stdout.on('data', data => {
        return data.toString();
      });

      pythonProcess.stderr.on("error", err => {
        return -1;
      } )

    } catch (error) {
        
        return error.message;
    }
}
