import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Wallpaper from '../images/wallpaper.png'
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
    marginBottom: "25px"
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "10%"
  },
  title: {
    fontSize: 24,
    marginLeft: "1%"
  },
  description: {
    marginLeft: "1%",
    width: "100%"
  },
  button: {
    textAlign: "left",
    width: "100%",
    textDecoration: "none",
    color: "black"
  },
  paperContainer: {
      width:'100%',
    backgroundImage: Wallpaper
}
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <img className={classes.img} src={Wallpaper} alt='img'></img>
      </div>
  );
}
