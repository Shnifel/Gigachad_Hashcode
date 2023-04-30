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
import { downloadCompetitionProblem, uploadCompetitionProblem } from '../../handlers/competitions';
import TestCasesBox from '../../components/TestCasesBox';
import { darkTheme } from '../../components/styles/Theme';
import { CssBaseline, ThemeProvider, Box, Paper } from '@material-ui/core';
import { Typography, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Edit } from '@mui/icons-material';

function ProblemAdmin() {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(null);

  // pdf file error state
  const [pdfError, setPdfError]=useState('');

  const handleUpload = async (file) =>{
    const res = await downloadCompetitionProblem();
   // const res = await uploadCompetitionProblem(file)
    console.log(res);
  }

 const downloadFile = (data, filename) => {
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const [testCases, setTestCases] = useState(["file1", "file2"])

   useEffect(() => {
    async function fetchdata(){
      try {
       const response = await downloadCompetitionProblem("problems/test.pdf")
       console.log(response);
       setPdfFile(response);
   

      } catch (error) {
        setPdfError(error.message);
      }
     }
      fetchdata();
   }, [])


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        handleUpload(selectedFile);
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
          setPdfError('');
          setPdfFile(e.target.result);
          console.log(pdfFile);
        }
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <div className="container">
      {pdfFile && <Paper sx = {{marginLeft: 20, display: 'flex', borderRadius: 5}}>
     <Box sx = {{
      display: 'flex',
      alignItems: 'center',
      marginBottom: 1,
      paddingLeft: 2,
      paddingRight: 2
    }} >
        <Typography> Competition problem </Typography>
         <IconButton onClick={() => downloadFile(pdfFile, "Competition problem")} color='inherit'>
          <SaveAltIcon />
        </IconButton>
        <IconButton color = 'inherit'>
            <Edit/>
        </IconButton>
        </Box></Paper>}
      <TestCasesBox />
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