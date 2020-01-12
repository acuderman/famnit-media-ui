import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Wallpaper from '../images/background.svg'
import Paper from "@material-ui/core/Paper";
import { BASE_URL } from "../config";

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
    width: "100%",
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
  }
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={"home"}>
      <iframe src={`${BASE_URL}/home`} />
      </div>
  );
}
