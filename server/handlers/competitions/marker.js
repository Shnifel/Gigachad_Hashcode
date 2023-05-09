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

export const markFile = async(req, res) => {
    try {
      console.log("Here")
      const compid = req.body.compid;
      const markerFile = await downloadFile(compid + "/marker.py");
      const pythonProcess = spawn('python', ['-c', markerFile.toString()]);
      let result = '';
      pythonProcess.stdout.on('data', data => {
        console.log(data.toString());
        return res.status(200).json(data.toString());
  });

   


    } catch (error) {
        console.log(error.message);
        
        return res.status(400).json(error.message);
    }
}
