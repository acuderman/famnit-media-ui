import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import layers from "../../images/layers.png";
import { Link } from "react-router-dom";
import resize from "../../images/resize.png";
import * as axios from 'axios'
import { API_BASE_URI } from "../../config";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "98%",
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
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  const { category } = props.match.params;
  
  
  const [subCategories, setSubCategories] = React.useState([])
  const [categoryID, setCategoryId] = React.useState('')
  const [force, setForce] = React.useState(0)

  React.useEffect(()=> {
    getCategoryIdFromSlug()
  }, [props])

  const getCategoryIdFromSlug = async () => {
    const response = await axios.get(`${API_BASE_URI}/categories/slug/${category}`)

    let id = undefined;
    if(response.data.length !== 0) {
      id = response.data[0].id;
    }
    setCategoryId(id)
    getSubCategories(id)
  }

  const getSubCategories = async (id) => {
    const response = await axios.get(`${API_BASE_URI}/categories/${id}/subcategories`)
    setSubCategories(response.data)
  }

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      {subCategories.map((sub, i) => {
      return <Paper key={i} className={classes.paper}>
      <Link to={`/${category}/${sub.slug}`} className={classes.button}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt="img" 
            src={sub.icon_url} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.title}
                >
                  {sub.name}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.description}
                >
                  {sub.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Paper>
      })}
    </div>
  );
}
