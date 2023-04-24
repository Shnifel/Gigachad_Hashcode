import React, {useState, useEffect} from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { getTeam } from '../../handlers/competitions'
import {useSelector} from "react-redux"
import {CircularProgress} from '@material-ui/core'
import { TeamRegister } from '../Teams'

const Team = (props) => {
    const id = props.id;
    console.log(id);
    const [teamInfo, setTeamInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const userID = useSelector(state => state.auth.userID);
    const inputs = {
        compid: id,
        uid: userID
    }
    const [registered, setRegistered] = useState(false);

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

  if (loading) 
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
    </ThemeProvider>
  )
}

export default Team