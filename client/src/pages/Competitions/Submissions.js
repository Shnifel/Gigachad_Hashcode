import {useState, useEffect, useRef, useCallback} from 'react'
import React from 'react';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { downloadFile, uploadFile } from '../../handlers/competitions';
import { darkTheme } from '../../components/styles/Theme';
import { CssBaseline, ThemeProvider, Box, Paper, Button, Grid, Avatar } from '@material-ui/core';
import { Typography, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Edit, Add, Save, Description as PdfIcon, AddRounded, Close, ExpandMore, ExpandLess} from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import {CircularProgress} from '@material-ui/core';
import { markFile } from '../../handlers/marker';
import { FileUploadRounded } from '@mui/icons-material';
import { addSubmission, getSubmissions } from '../../handlers/submissions';

import "../login.scss";

function Submissions(props) {

  const compid = props.compid; //obtain competition id
  const numtests = props.numtests; //obtain number of test cases
  const subsid = props.subsid; //obtain submission id for team in competition

  const [subs, setSubs] = useState(Array(numtests).fill(null)); // submission files - latest
  const [submit, setSubmit] = useState(Array(numtests).fill(false)); // submit state toggled for each 
  const [markedState, setMarkedState] = useState(Array(numtests).fill(null)); // judgement on marked or not
  const [subsdata, setSubsdata] = useState({max_scores: [80, 0, null, 0,  0], subs_history: [{time: "12-05-2023 21:00", score: 80, test_case: 1}, {time: "12-06-2023 21:00", score: 90, test_case: 3}]}); // All submissions metadata including times, scores, feedback
  const [changedSubs, setChangedSubs] = useState(Array(numtests).fill(null)); // submission file has pending changes
  const [changedZips, setChangedZips] = useState(Array(numtests).fill(null));
  const zipInputRefs = useRef([]); //input refs for zip files uploads
  const solnInputRefs = useRef([]); // input refs for solution file uploads
  const [loading, setLoading] = useState(true); // loading submissions data
  const [changes, setChanges] = useState(true);
  const array = Array(numtests).fill(null);
  const [expanded, setExpanded] = useState(null);
  
  //Fetch submissions data for given subs id
  useEffect(() => {
    async function fetchdata(){
      try {
       const response = await getSubmissions({subsid})
       setSubsdata(response);
       setLoading(false);

      } catch (error) {
         setLoading(false);
      }
      
     }
      fetchdata()}, [])

  //Upload file
  const handleUpload = async (path, file) =>{
    try {
      const res =  await uploadFile(path, file);
    } catch (error) {
      console.log(error.message);
    }
  }


  const handleZipFileChange = (index) => {
    const zipFileRef = zipInputRefs.current[index];
    if (zipFileRef) {
       zipFileRef.click(); // Trigger click on the corresponding file input
    
  }
  }
  
  const toggleSubmit = (index) => {
    const arr = [...submit]
    arr[index] = !arr[index]
    const zips = [...changedZips]
    zips[index] = null
    setChangedZips(zips)
    const subs = [...changedSubs]
    subs[index] = null
    setChangedSubs(subs)
    setSubmit(arr);
  }

  const toggleExpanded = (index) => {
    if (expanded === index){
      setExpanded(null);
    }
    else{
      setExpanded(index);
    }
    
  }

  

  const updateZipFile =(e, index) => {
    const selectedFile = e.target.files[0];
    const arr = [...changedZips];
    arr[index] = selectedFile;
    setChangedZips(arr);
  }

  const handleSubsFileChange = (index) => {
    const subsRef = solnInputRefs.current[index];
    if (subsRef) {
      subsRef.click(); // Trigger click on the corresponding file input
    }
  }

  const updateSolnFile =(e, index) => {
    const selectedFile = e.target.files[0];
    const arr = [...changedSubs];
    arr[index] = selectedFile;
    setChangedSubs(arr);
  }

  const handleSubmit =  async (index) => {
    try {
      const zipFile = changedZips[index];
      let test_case = index + 1;
      if (zipFile) {
        await handleUpload(compid + "/submissions/" + subsid + "/src_code_" + test_case + ".zip", zipFile);
        const arr = [...changedZips]
        arr[index] = null
        setChangedZips(arr);
      }

      const solnFile = changedSubs[index];
      if (solnFile) {
        await handleUpload(compid + "/submissions/" + subsid + "/test_case_" + test_case + ".txt", solnFile);
        const arr = [...changedSubs]
        arr[index] = null
        setChangedSubs(arr);

        const marked = [...markedState];
        marked[index] = "Pending Judgement"
        setMarkedState(marked);
        const feedback = await addSubmission({compid, subsid, test_case: (index + 1)});
        const updated = [...markedState]
        updated[index] = feedback;
        console.log("Here");
        setMarkedState(updated);
      }

    } catch (error) {
      console.log(error.message);
    } 
  }


 const downloadFileLocal = (data, filename) => {
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



   


  if (loading) // Data not yet back
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div style = {{display: 'flex', width: '100%', height: "100%", justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    </ThemeProvider>
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
       
    <div className="container">
      <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 20, fontStyle: 'bold', color: "#f500ff", m: 2 }}>
        Submissions
      </Typography>
    

      <Box sx={{m: 3, bgcolor: '#1e1e1e', display: 'inline-block'}}>
      <TableContainer style={{display: 'flex'}} >
      <Table >
        <TableHead style={{backgroundColor: '#0000ff'}}>
          <TableRow>
            <TableCell style={{fontFamily: 'Arcade'}}>TEST CASES</TableCell>
            <TableCell style={{fontFamily: 'Arcade'}}>SOURCE CODE</TableCell>
            <TableCell style={{fontFamily: 'Arcade'}}>SOLUTION</TableCell>
            <TableCell style={{fontFamily: 'Arcade'}}>SCORE KEPT</TableCell>
            <TableCell></TableCell> 
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {array.map((state, index) => (
            <React.Fragment key={index}>
            <TableRow key={index}>
              <TableCell>{"Test Case " + (index +1)}</TableCell>
              <TableCell>
              <input
                      type="file"
                      accept='.zip'
                      style={{ display: 'none' }}
                      ref={(ref) => (zipInputRefs.current[index] = ref)} // Store ref to the file input
                      onChange = {  (event) => { updateZipFile(event, index)}}
                    />
                  <IconButton color='inherit'  onClick = {() => {handleZipFileChange(index)}}>
                     <FileUploadRounded/>
               </IconButton>
              </TableCell>
              <TableCell>
              <input
                      type="file"
                      accept='.txt'
                      style={{ display: 'none' }}
                      ref={(ref) => (solnInputRefs.current[index] = ref)} // Store ref to the file input
                      onChange = {  (event) => {updateSolnFile(event, index)}}
                    />
                  <IconButton color='inherit'  onClick = {(event) => handleSubsFileChange(index)}>
                    <FileUploadRounded/>
               </IconButton>
              </TableCell>
              <TableCell>
                
                {subsdata.max_scores[index] ? subsdata.max_scores[index] : "--"}

              </TableCell>

              <TableCell>
                {markedState[index] === "Delivered to marker. Pending Judgement" && 
                  <CircularProgress/>
                   }

                {markedState[index]}
              </TableCell>

              <TableCell>
                {submit[index] ? 
              <Box sx={{ml: 2}}>
             <Button
           variant="outlined"
           size="small"
           onClick={async () => {await handleSubmit(index)}}>
            SUBMIT
              </Button>
              <IconButton color = "inherit" onClick={() => toggleSubmit(index)}>
                 <Close/>
              </IconButton>

             
         </Box> : <Box sx = {{alignItems: 'center', display: 'flex'}} onClick={() => {toggleSubmit(index)}}> 
         <AddRounded/> Add Submission </Box>
         }
              </TableCell>
              
              <TableCell>
                
                <Box sx = {{display: 'flex', alignItems: 'center'}}>
                <IconButton color='inherit' onClick={() => toggleExpanded(index)}>
                  {expanded === index ? <ExpandLess/> : <ExpandMore/>  }
                </IconButton> 
                View submissions history
                </Box>
              </TableCell>

            </TableRow>
            
            {expanded === index &&
            (<TableRow>
             
                <TableCell colSpan={4}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell> Submissions History </TableCell>
                        <TableCell> Status </TableCell>
                        <TableCell> Score </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subsdata.subs_history.filter(sub => sub.test_case === index + 1).map((sub) => (
                        <TableRow key={sub.time}>
                          <TableCell>
                            {console.log("Here")}
                            {sub.time}
                          </TableCell>
                          <TableCell>
                            {sub.score === -1 ? "Marking failed" : "Test case scored"}
                          </TableCell>
                          <TableCell>
                            {sub.score}
                          </TableCell>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableCell>
            
            </TableRow>)
            
            }
            
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>  
    </div>
    </ThemeProvider>
  );
}

export default Submissions;