import {useState, useEffect} from 'react'
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
import { downloadFile, uploadCompetitionProblem } from '../../handlers/competitions';
import TestCasesBox from '../../components/TestCasesBox';
import { darkTheme } from '../../components/styles/Theme';
import { CssBaseline, ThemeProvider, Box, Paper, Avatar, Grid } from '@material-ui/core';
import { Typography, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {CircularProgress} from '@material-ui/core';
import { Description as PdfIcon } from '@mui/icons-material';

const PDFViewer = (props) => {

  // creating new plugin instance
  const compid = props.compid;
  const numtests = props.numtests;
  console.log(compid);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(null);
 const [tests, setTests] = useState([])
  // pdf file error state
  const [pdfError, setPdfError]=useState('');
  const [loading, setLoading] = useState(true);


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
       const response = await downloadFile(compid + "/problem.pdf")
       setPdfFile(response);

       const newTests = Array(numtests).fill(null);

       for (let i = 1; i <= numtests; i++){
        try {
          const response = await downloadFile(compid + "/testCases/test_case_" + i + ".txt");
          newTests[i-1] = response;
        } catch (error) {
          continue;
        }
       }

       setTests(newTests)
       setLoading(false);
   

      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
     }
      fetchdata();
   }, [])

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
        Competition Problem
      </Typography>
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
  
      <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 20, fontStyle: 'bold', color: "#2A3492", m: 2 }}>
       Test Cases
      </Typography>
      <TestCasesBox testCases = {tests} />

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

      </div>

    </div>
    </ThemeProvider>
  );
}

export default PDFViewer;