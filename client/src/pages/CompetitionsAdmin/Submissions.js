import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '../../components/styles/Theme'
import {  Button, CircularProgress, CssBaseline } from '@mui/material'
import { getAllSubmissions } from '../../handlers/submissions'
import { getURL } from '../../handlers/competitions'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const SubmissionsAdmin = (props) => {
    const [data, setData] = useState(null);
    const [srcUrls, setDownloads] = useState(null);
    const [fNames, setfNames] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchdata(){
          try {
           const response = await getAllSubmissions({compid : props.compid})
           setData(response);

           let urls = Array(props.numtests * await response.length).fill(null)
           let files = Array(props.numtests * await response.length).fill(null)
           let count = 0;
           for (let i = 0; i < await response.length; i++){
                const team = await response[i];
                const subs = await team.max_scores;
                for (let j = 1; j <= props.numtests; j++){
                  if (await subs[j-1] !== null){
                    urls[count] = await getURL(props.compid + "/submissions/" + await team.subsRef + "/src_code_" + j + ".zip")
                    files[count] = await team.teamname + "_test_case_" + j + ".zip"
                    
                  }
                  count += 1
                }
           }

           setDownloads(urls)
           setfNames(files)

           setLoading(false);
          } catch (error) {
             setLoading(false);
          }
         }
          fetchdata();
    
          const interval = setInterval(fetchdata, 20000);
    
          // Clean up the interval on component unmount
          return () => {
            clearInterval(interval);
          };
        
        }, [])


        const handleExportClick = async () => {
          const downloadUrls = [...srcUrls]; // Replace arrayOfDownloadUrls with your actual array
        
          // Create a new instance of archiver
          const zip = new JSZip();
        
          // Create a response array to store the fetched zip files
          const responses = Array(props.numtests * data.length).fill(null);
        
          // Fetch each zip file using the download URLs
          let count = 0
          for (const url of downloadUrls) {
            if (url){
              const response = await fetch(url);
              responses[count] = await response.blob();
              zip.file( fNames[count], responses[count])
            }
            count += 1
          }
        
          const content = await zip.generateAsync({ type: 'blob' })

         // Trigger the file download using FileSaver.js
          saveAs(content, 'exportedFiles.zip');

        };



    


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

        <Button onClick={handleExportClick}>
          EXPORT FILES
        </Button>
    </ThemeProvider>
  )
}

export default SubmissionsAdmin