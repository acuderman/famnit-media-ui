import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: "200px",
      color: theme.palette.text.secondary
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "80%",
      marginBottom:'10px'
    }
  })
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to='/watch/video_id'>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            What are layers?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to='/watch/video_id'>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            What are layers?
          </Typography>
        </Grid>
        <Grid item  xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to='/watch/video_id'>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            What are layers?
          </Typography>
        </Grid>
        <Grid item  xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to='/watch/video_id'>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            What are layers?
          </Typography>
        </Grid>
        <Grid item  xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to='/watch/video_id'>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            What are layers?
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
