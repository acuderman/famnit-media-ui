import React from "react";
import VideoTile from '../../components/videos-tile/index'
import * as axios from 'axios'
import { API_BASE_URI } from "../../config";
import { getToken } from "../../helpers/get-token";

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
      console.log(e)
    }
  }


  return (
    <div>
      <h1>Videos</h1>
      {videos.map((elt) => {
        return <div className='video-wrapper'>
        <VideoTile id={elt.id} title={elt.title} description={elt.description} refreshVideos={getVideos} />
      </div>
      })}
    </div>
  );
};

export default VideosPage;
