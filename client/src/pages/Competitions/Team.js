import React, {useState, useEffect} from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { getTeam } from '../../handlers/competitions'
import {useSelector} from "react-redux"
import {CircularProgress} from '@material-ui/core'
import { TeamRegister } from '../Teams'
import TeamDisplay from './TeamDisplay'

const Team = (props) => {
    const id = props.id; // Get competition id
    const [teamInfo, setTeamInfo] = useState(null); // Team related information
    const [loading, setLoading] = useState(true); // Loading state
    const userID = useSelector(state => state.auth.userID); // Obtain relevant user id
    const inputs = {
        compid: id,
        uid: userID
    }
    const [registered, setRegistered] = useState(false);

    // Asynchronously load data related to competition
    useEffect(() => {
        async function fetchdata(){
         try {
          const response = await getTeam(inputs)
          setTeamInfo(response);
          setLoading(false);
          setRegistered(true);
         } catch (error) {
            setLoading(false);
            setRegistered(false);
         }
         
        }
         fetchdata()}, []);



  if (loading) // Data not yet back
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div style = {{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    </ThemeProvider>
  )

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        {!loading && console.log(teamInfo)}
        {!loading && !registered && <TeamRegister compid = {id}/>}
        {!loading && registered && <TeamDisplay data = {teamInfo}/>}
    </ThemeProvider>
  )
}

export default Team