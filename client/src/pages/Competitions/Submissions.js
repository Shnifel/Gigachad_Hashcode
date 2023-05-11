import {useState, useEffect, useRef} from 'react'
import React from 'react';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { downloadFile, uploadFile } from '../../handlers/competitions';
import { darkTheme } from '../../components/styles/Theme';
import { CssBaseline, ThemeProvider, Box, Paper, Button, Grid, Avatar } from '@material-ui/core';
import { Typography, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Edit, Add, Save, Description as PdfIcon} from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import {CircularProgress} from '@material-ui/core';
import { markFile } from '../../handlers/marker';

import "../login.scss";

function Submissions(props) {

  const compid = props.compid;
  const numtests = props.numtests;
  const subsid = props.subsid;

  // pdf file error state
  const [pdfError, setPdfError]=useState('');
  const [subs, setSubs] = useState(Array(numtests).fill(null));
  const [submit, setSubmit] = useState(Array(numtests).fill(false));
  const [markedState, setMarkedState] = useState(Array(numtests).fill(null));
  const [subsdata, setSubsdata] = useState(null);
  const [changedSubs, setChangedSubs] = useState(Array(numtests).fill(null));
  const zipInputRefs = useRef([]);
  const solnInputRefs = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleUpload = async (path, file) =>{
    try {
      const res =  await uploadFile(path, file);
      setChanges(!changes);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleZipFileChange = (index) => {
    const zipFileRef = zipInputRefs.current[index];
    if (zipFileRef) {
       zipFileRef.click(); // Trigger click on the corresponding file input
    }
  };


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



   useEffect(() => {
    async function fetchdata(){
      try {

       setLoading(false);
      } catch (error) {
        setLoading(false);
      }
     }
      fetchdata();
   }, [changes])


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = async (e) =>{
    let selectedFile = e.target.files[0];
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
 
    
    if (selectedFile){
      await handleUpload(compid + "/testCases/test_case_" + i + ".txt", selectedFile)
    }
  }

  const uploadMarkerFile = async(e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile){
      await handleUpload(compid + "/marker.py", selectedFile)
    }
    try {
      const res = await markFile({compid});
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
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
                  
               
              </TableCell>
              <TableCell>

              </TableCell>
              <TableCell>

              </TableCell>

            </TableRow></React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
         <Box sx={{ml: 2}}>
        <Button
           variant="outlined"
           size="small"
           onClick={handleMarkerInput}
           
         >
           {marker ? "Change marker"  : "Upload competition marker"}
         </Button> <input type='file' color='white' accept = '.py' ref = {markerInputRef} onChange={uploadMarkerFile} style={{display: 'none'}}/></Box>

    </div>
    </ThemeProvider>
  );
}

export default Submissions;