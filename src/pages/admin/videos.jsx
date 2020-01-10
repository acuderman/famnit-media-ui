import React from "react";
import VideoTile from '../../components/videos-tile/index'
import * as axios from 'axios'
import { API_BASE_URI } from "../../config";
import { getToken } from "../../helpers/get-token";
import {Paper} from "@material-ui/core";

const VideosPage = props => {
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
    <div>
      <Paper>
      <h1
        style={{
          height:"61px",
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "Rubik",
          marginTop:0,
          paddingTop:"15px",
          paddingBottom:"15px",
          color: "#3f515",
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
