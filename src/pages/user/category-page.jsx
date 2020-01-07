import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import layers from "../../images/layers.png";
import { Link } from "react-router-dom";
import resize from "../../images/resize.png";
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
    maxWidth: "90%",
    maxHeight: "90%"
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Link to="/photoshop/working-with-layers" className={classes.button}>
          <Grid container spacing={2}>
            <Grid item className={classes.image}>
              <img className={classes.img} alt="img" src={layers} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.title}
                  >
                    Working with layers
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.description}
                  >
                    Here you can learn how to work with layers in Photoshop.
                    Working with layers is something everyone using Photoshop
                    has to understand. No worries, we will make it simple for
                    you to understand.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Paper>

      <Paper className={classes.paper}>
        <Link to="/photoshop/image-size" className={classes.button}>
          <Grid container spacing={2}>
            <Grid item className={classes.image}>
              <img className={classes.img} alt="img" src={resize} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.title}
                  >
                    Change the image size
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.description}
                  >
                    Here you can learn how to change the image size in
                    Photoshop. Changing the image site in Photoshop is eazy and
                    very usefull. Lets learn it!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Paper>
    </div>
  );
}
