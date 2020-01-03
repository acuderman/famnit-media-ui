import React from "react";
import VideoTile from '../../components/videos-tile/index'

const VideosPage = props => {

  return (
    <div>
      <h1>Videos</h1>
      <div className='video-wrapper'>
        <VideoTile id={'1'} title={'title'} description={'description'} />
        <div className='video-delimeter' />
        <VideoTile id={'2'} title={'title'} description={'description'} />
      </div>
    </div>
  );
};

export default VideosPage;
