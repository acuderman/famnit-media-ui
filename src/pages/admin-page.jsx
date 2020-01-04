import React from "react";
import GoogleAuth from "../components/admin";
import "./fonts.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { fontFamily } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const AdminPage = props => {
  const classes = useStyles();

  return (
    <div
      style={{
        height: "30%",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "10px",
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
        <br />
        <p style={{ fontSize: 12, fontWeight: "300" }}>
          If you have admin rights you can login and manage the website.
        </p>
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
        <GoogleAuth
          signedIn={props.signedIn}
          onSignOutResponse={props.onSignOutResponse}
          onSignInResponse={props.onSignInResponse}
        />
      </div>
    </div>
  );
};

export default AdminPage;
