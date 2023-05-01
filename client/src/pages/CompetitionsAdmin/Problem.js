import {useState, useEffect, useRef} from 'react'
import React from 'react';
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { downloadFile, uploadCompetitionProblem, uploadFile } from '../../handlers/competitions';
import TestCasesBox from '../../components/TestCasesBox';
import { darkTheme } from '../../components/styles/Theme';
import { CssBaseline, ThemeProvider, Box, Paper, Button, Grid, Avatar } from '@material-ui/core';
import { Typography, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Edit, Add, Save, Description as PdfIcon} from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import "../login.scss";

function ProblemAdmin(props) {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const compid = props.compid;
  const numtests = props.numtests;

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(null);
  // pdf file error state
  const [pdfError, setPdfError]=useState('');
  const [tests, setTests] = useState(Array(numtests).fill(null))
  const [editMode, setEditmode] = useState(false);
  const [changes, setChanges] = useState(false);
  const pdfInputRef  = useRef(null);
  const testInputs = useRef([]);

  const handleUpload = async (path, file) =>{
    try {
      const res =  await uploadFile(path, file);
      console.log("Uploaded")
      setChanges(!changes);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleTextFileChange = async (index) => {
    const inputFileRef = testInputs.current[index];
    if (inputFileRef) {
      console.log("Here at handleFileChange")
      await inputFileRef.click(); // Trigger click on the corresponding file input
    }
  };


  const handlePdfInput = async () => {
    await pdfInputRef.current.click();
  }

 const downloadFileLocal = (data, filename) => {
    console.log("Here")
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



   useEffect(() => {
    async function fetchdata(){
      try {
      
       const response = await downloadFile(compid + "/problem.pdf")
       console.log(response)
       console.log("Here")
       setPdfFile(response);

       const newTests = [];

       for (let i = 1; i <= numtests; i++){
        const response = await downloadFile(compid + "/testCases/test_case_" + i + ".txt");
       
        newTests[i-1] = response;
       
       }

       setTests(newTests)
      } catch (error) {
        console.log(error.message);
        setPdfError(error.message);
      }
     }
      fetchdata();
   }, [changes])


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = async (e) =>{
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        
        await handleUpload(compid + "/problem.pdf", selectedFile);
        setPdfFile(null);
        
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

  const uploadTextFile = async (e, index) => {
    let selectedFile = e.target.files[0];
    let i = index + 1;
    console.log("Here at uploadFileButton")
    
    if (selectedFile){
      await handleUpload(compid + "/testCases/test_case_" + i + ".txt", selectedFile)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      
        
       
    <div className="container">
      <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 20, fontStyle: 'bold', color: "#f500ff", m: 2 }}>
        Competition Problem
      </Typography>
    <label><h2></h2></label>
    {pdfFile && <Box sx = {{m: 2}}><Paper sx = {{marginLeft: 20, display: 'flex', borderRadius: 5}} spacing = {2}>
      
     <Box sx = {{
      display: 'flex',
      alignItems: 'center',
      marginBottom: 1,
      paddingLeft: 2,
      paddingRight: 2
    }} >
      <Avatar variant='square'>
        <PdfIcon/>
      </Avatar>
        <Typography sx = {{ m : 1}}> Competition problem </Typography>
         <IconButton onClick={() => downloadFileLocal(pdfFile, "Competition problem")} color='inherit'>
          <SaveAltIcon />
        </IconButton>
        </Box></Paper> <Grid container>
          </Grid></Box>}
        <Box sx={{ml: 2}}>
       <Button
          variant="outlined"
          size="small"
          onClick={handlePdfInput}
          
        >
          {pdfFile ? "Change pdf"  : "Upload competition problem"}
        </Button> <input type='file' color='white'  ref = {pdfInputRef} onChange={handleFile} style={{display: 'none'}}/></Box>
       
        <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 20, fontStyle: 'bold', color: "#2A3492", m: 2 }}>
       Test Cases
      </Typography>
      <Box sx={{m: 2, bgcolor: '#1e1e1e', display: 'inline-block'}}>
      <TableContainer style={{display: 'flex'}} >
      <Table >
        <TableHead style={{backgroundColor: '#0000ff'}}>
          <TableRow>
            <TableCell style={{fontFamily: 'Arcade'}}>TEST CASES</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test, index) => (
            <React.Fragment key={index}>
            <TableRow key={index}>
              <TableCell>{"Test Case " + (index +1)}</TableCell>
              <TableCell>
              <input
                      type="file"
                      accept='.txt'
                      style={{ display: 'none' }}
                      ref={(ref) => (testInputs.current[index] = ref)} // Store ref to the file input
                      onChange = { async (event) => { await uploadTextFile(event, index)}}
                    />
                  <IconButton color='inherit'  onClick = {async () => await handleTextFileChange(index)}>
                    <CloudUpload />
                  </IconButton>
                  
               {console.log(tests)}
                {test && (
                  <IconButton onClick={() => downloadFileLocal(test, "test_case_" + (index+1) + ".txt")} color='inherit'>
                    <CloudDownload />
                  </IconButton>
                )}
              </TableCell>
            </TableRow></React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
      <form>

        <label><h2>Upload PDF</h2></label>
        <br></br>

        <input type='file' className="form-control"
        onChange={handleFile}></input>

       
        {pdfError&&<span className='text-danger'>{pdfError}</span>}

      </form>

      {/* View PDF */}
      <div className="viewer">

        {/* render this if we have a pdf file */}
        {pdfFile&&(
          
          <Box sx = {{display: 'flex', margin: 3, justifyContent: 'center', alignContent: 'center'}}>
          <Box sx = {{ width: '60%' }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.js">
            <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]} ></Viewer>
          </Worker>
          </Box></Box>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile&&<>No file is selected yet</>}

      </div>

    </div>
    </ThemeProvider>
  );
}

export default ProblemAdmin;