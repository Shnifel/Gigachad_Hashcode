import { db, bucket } from "../../database/firebase.js";
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
        console.log("Here")
        reject(error)
      }

      let output = '';
      pythonProcess.stdout.on('data', data => {
        output = data.toString();
      });

      pythonProcess.stderr.on("error", err => {
        console.log(err)
        reject(err);
      });

      const timeout = setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('Marking timed out after 1s'));
      }, 1000);

      pythonProcess.on('close', (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error('An error has occurred'));
        } else {
          resolve(output);
        }
      });

      

    } catch (error) {
      reject(error);
    }
  });
};
