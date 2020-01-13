import React from "react";
import VideoTile from '../../components/videos-tile/index'
import * as axios from 'axios'
import { API_BASE_URI } from "../../config";
import { getToken } from "../../helpers/get-token";
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
}));

const VideosPage = props => {
    const classes = useStyles();

    const [videos, setVideos] = React.useState([])

  React.useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URI}/videos`)
      setVideos(response.data)  
    } catch(e) {
      // err
    }
  }


  return (
    <div className={"page"}>
        <div className={classes.toolbar} />

        <div>
      <Paper  elevation="0" style={{backgroundColor:"#003366"}}>
      <h1
        style={{
          height:"41px",
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "Rubik",
          marginTop:0,
          paddingTop:"14px",
          color: "white",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        Videos
      </h1>
      </Paper>
      {videos.map((elt) => {
        return <div className='video-wrapper'>
        <VideoTile id={elt.id} title={elt.title} description={elt.description} refreshVideos={getVideos} />
      </div>
      })}
    </div>
    </div>
  );
};

export default VideosPage;
