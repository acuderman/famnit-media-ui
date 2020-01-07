import React from "react";
import GoogleAuth from "../../components/admin/index";

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
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
            />
          </form>
          
          <div>
            <Button variant="contained" color="primary" style={{marginBottom:'15px'}}>
              Login
            </Button>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    </Paper>
  );
};

export default AdminPage;
