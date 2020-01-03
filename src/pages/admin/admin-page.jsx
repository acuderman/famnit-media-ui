import React from "react";
import GoogleAuth from "../../components/admin";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
    <div>
      ADMIN
      <br />
      <GoogleAuth
        signedIn={props.signedIn}
        onSignOutResponse={props.onSignOutResponse}
        onSignInResponse={props.onSignInResponse}
      />
    </div>
  );
};

export default AdminPage;
