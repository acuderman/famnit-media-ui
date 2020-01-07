import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import * as axios from 'axios'
import { API_BASE_URI } from "../../config";

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

export default function CenteredGrid( props) {
  const classes = useStyles();
  const { sub_category, category } = props.match.params;
  
  
  const [videos, setVideos] = React.useState([])
  const [subCategoryId, setSubCategoryId] = React.useState('')

  React.useEffect(()=> {
    getCategoryIdFromSlug()
  }, [])

  const getCategoryIdFromSlug = async () => {
    const response = await axios.get(`${API_BASE_URI}/categories/slug/${sub_category}`)

    let id = undefined;
    if(response.data.length !== 0) {
      id = response.data[0].id;
    }
    setSubCategoryId(id)
    getVideos(id)
  }

  const getVideos = async (id) => {
    const response = await axios.get(`${API_BASE_URI}/categories/${id}/videos`)
    setVideos(response.data)
  }

  if(subCategoryId === undefined) {
    return <div> This section does not exist </div>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      {videos.map((elt) => {
        return <Grid item xs={12} sm={6} md={6} lg={3} style={{textAlign:'center'}}>
        <Link to={`/${category}/${sub_category}/${elt.youtube_video_id}`}>
          <img
            className={classes.img}
            alt="img"
            src="https://img.youtube.com/vi/3gxcIn8L__w/maxresdefault.jpg"
          />
          </Link>
          <Typography>
            {elt.title}
          </Typography>
        </Grid>
      })}
      </Grid>
    </div>
  );
}
