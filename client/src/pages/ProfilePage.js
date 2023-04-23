import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: blueGrey[800],
      paper: blueGrey[700],
    },
    primary: {
      main: blueGrey[500],
    },
    text: {
      primary: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%",
    borderRadius: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(1),
  },
}));

function ProfilePage() {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [location, setLocation] = useState("New York");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    
    <div className={classes.container}>
      <div>
        <i className="fas fa-user-circle fa-5x"></i>
      </div>
      <div className={classes.header}>Profile Page</div>
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          disabled={!isEditing}
        />
        <TextField
          className={classes.textField}
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          disabled={!isEditing}
        />
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={!isEditing}
        />
        <TextField
          className={classes.textField}
          label="Location"
          variant="outlined"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          disabled={!isEditing}
          select
        >
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="London">London</MenuItem>
          <MenuItem value="Paris">Paris</MenuItem>
          <MenuItem value="Tokyo">Tokyo</MenuItem>
        </TextField>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            className={classes.button}
            startIcon={<i className="fas fa-save"></i>}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            className={classes.button}
            startIcon={<i className="fas fa-pencil-alt"></i>}
          >
            Edit
          </Button>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;

         
