import React from "react";
import * as axios from 'axios';

import "../fonts.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  TextField,
  Paper
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { fontFamily, maxHeight } from "@material-ui/system";
import { API_BASE_URI, BASE_URL } from "../../config";
import * as Cookies from 'js-cookie'
import SubmitButton from "../../components/submit-button";
import CustomizedSnackbars from "../../components/snackbar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth:'80vh',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'10px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  editext: {
    margin: "10px",
    alignSelf:'flex-end'
  },
  paper:{
    flexGrow:1,
    width:500,
    marginLeft:'auto',
    marginRight:'auto'
    
  }
}));

const AdminPage = props => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  React.useEffect(() => {
    if (props.singnedIn) {
      window.location.href = `${BASE_URL}/videos`
    }
  }, [])


  const onSubmit = async () => {
    setSubmitInProgress(true)
    try {
      const response = await axios.post(`${API_BASE_URI}/login`, {
        username,
        password,
      })

      Cookies.set('token', response.data.access_token)
      props.onSignInResponse()
    }catch(e) {
      setSubmitInProgress(false)
      setSnackbarErrorText('Wrong username or password')
    }
  }

  const onSnackbarClose = () => {
    setSnackbarSuccessText('');
    setSnackbarErrorText('');
}


  return (
    <Paper className={classes.paper} variant="outlined">
      <div
        style={{
          height: "30%",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            paddingTop: "40px",
            textAlign: "center",
            fontFamily: "Rubik",
            color: "#3f515",
            fontSize: 22,
            fontWeight: "bold"
          }}
        >
          Admin Login:
        </div>
        <div
          style={{
            height: "80%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            alignItems: "center"
          }}
        >
          <form className={classes.root} autoComplete="off">
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          
          <div>
          <div className="button-add-categories-center">
        <SubmitButton inProgress={submitProgress} onClick={onSubmit} />
        <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
        <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} />
      </div>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    </Paper>
  );
};

export default AdminPage;
