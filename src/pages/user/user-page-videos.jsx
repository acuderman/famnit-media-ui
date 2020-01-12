/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import GoogleAuth from "../../components/admin";
import Snackbar from "../../components/snackbar";
import { GOOGLE_API_BASE_URL, GOOGLE_AUTH_API_BASE_URL , YOUTUBE_API_KEY, API_BASE_URI, BASE_URL } from "../../config";
import * as axios from "axios";
import TextField from '@material-ui/core/TextField';
import * as Cookies from 'js-cookie';
import SendIcon from '@material-ui/icons/Send';
import {
    Link
} from 'react-router-dom';
import { Button, Paper } from "@material-ui/core";
import { dark } from "@material-ui/core/styles/createPalette";


const UserVideosPage = props => {
  const { category , video_id, sub_category } = props.match.params;
  const [comments, setComments] = React.useState([]);
  const [access_token, setAccessToken] = React.useState(undefined)
  const [comment, setComment] = React.useState('');
  const [successSnackbar, setSuccessSnackbar] = React.useState('')
  const [errorSnackbar, setErrorSnackbar] = React.useState('')
  

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')


  const [videos, setVideos] = React.useState([])
  const [subCategoryId, setSubCategoryId] = React.useState('')
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)

  const getComments = async () => {
    const comments = await axios.get(
      `${GOOGLE_API_BASE_URL}/commentThreads?key=${YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=100`
    );
    setComments(comments.data.items);
  };

  React.useEffect(() => {
    getComments();
    verifyAccessToken()
    getCategoryIdFromSlug()
  }, []);

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
    const data = response.data;
    setVideos(response.data)

    const currentVideoInd = data.findIndex((elt) => { return elt.youtube_video_id === video_id})
    setTitle(response.data[currentVideoInd].title)
    setDescription(response.data[currentVideoInd].description)
    setCurrentVideoIndex(currentVideoInd)
  }

  const verifyAccessToken = async () => {
      const token = Cookies.get('youtube-token')
    try {
        await axios.get(
        `${GOOGLE_AUTH_API_BASE_URL}/tokeninfo?access_token=${token}`
      );
      setAccessToken(token);
    } catch(e) {
      setAccessToken(undefined)
    }    
  }

  const onAuthResponse = (data) => {
    Cookies.set('youtube-token', data.accessToken);
    setAccessToken(data.accessToken);
  }

  const onCommentChange = (e) => {
      setComment(e.target.value)
  }

  const onSubmit = async () => {
      if(comment.length === 0 ) {
          return
      }

      try {
        await axios.post(
            `${GOOGLE_API_BASE_URL}/commentThreads?part=snippet&key=${YOUTUBE_API_KEY}`,
            {
                "snippet": {
                  "videoId": video_id,
                  "topLevelComment": {
                    "snippet": {
                      "textOriginal": comment,
                    }
                  }
                }
              },
              {headers: {Authorization: `Bearer ${access_token}`}},
          );
          setComment('')
          setSuccessSnackbar('You successfully posted a comment')
      } catch(e) {
        setErrorSnackbar(e.message)
      }

      setTimeout(() => {
        deleteSnakbars()
      }, 5000)

      getComments();
  }

  const deleteSnakbars = async () => {
    setSuccessSnackbar('')
    setErrorSnackbar('')
}

const changeUrl = (path) => {
  window.location.href=`${BASE_URL}/${path}`
}
  
  const commentInput = access_token !== undefined 
  ? <div className='post-comment'><TextField variant="outlined" value={comment} style={{ width: '90%' }} onChange={onCommentChange} id="standard-basic" label="Add a comment" /> <span  onClick={onSubmit} className='send-icon'><Button variant="contained" color="primary" style={{width:"9%",height:"55px",marginTop:"1px"}}>Send</Button></span> </div>
  : <div className='comment'> <h4> if you want to comment, you need to log in </h4> <GoogleAuth onSignInResponse={onAuthResponse} /> </div>

  const previousButton = currentVideoIndex !== 0 
    ? <div className='video-navigation-buttons' onClick={() => changeUrl(`${category}/${sub_category}/${videos[currentVideoIndex - 1].youtube_video_id}`)} ><Button style={{width:"150px",height:"60px"}} variant="contained"  fullWidth fullHeight> Previous video</Button></div>
    : <div className='video-navigation-buttons' onClick={() => changeUrl(`${category}/${sub_category}`)}><Button style={{width:"150px",height:"60px"}} variant="contained"  fullWidth fullHeight> Go back to categories</Button></div>

    const nextButton = currentVideoIndex < videos.length -1
    ? <div className='video-navigation-buttons' onClick={() => changeUrl(`${category}/${sub_category}/${videos[currentVideoIndex + 1].youtube_video_id}`)} ><Button style={{width:"150px",height:"60px"}} variant="contained"  fullWidth fullHeight > Next video</Button></div>
    : <div className='video-navigation-buttons' onClick={() => changeUrl(`${category}/${sub_category}`)}><Button style={{width:"150px",height:"60px"}} variant="contained" fullWidth fullHeight> Go back to categories</Button></div>

  return (
    <div className="watch-videos">
      <div class="videoWrapper">
        <iframe
          width="560"
          height="349"
          src={`http://www.youtube.com/embed/${video_id}`}
          frameborder="0"
          allowfullscreen='allowfullscreen'
        ></iframe>
      </div>
      <div style={{textAlign:"center"}}>
      <h2 style={{
    marginTop:"-30px"}}>{title}</h2>
      <h3 style={{}}>{description}</h3>
      </div>
      <br/>
      <br/>
      <div className='nav-buttons'>
      {previousButton}
      {nextButton}
        </div>
        <div className={'split-40px'}> </div>
      <div className={'split-80px'}> </div>
      <Paper elevation="0" style={{background: "#003366"}}>
      <h1
        style={{
          height:"40px",
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "Rubik",
          marginTop:0,
          paddingTop:"13px",
          color: "white",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        Comments
      </h1>
      </Paper>
      {commentInput}
      {comments.map(comment => {
        const snippet = comment.snippet.topLevelComment.snippet;
        return (
          <div className="youtube-comment">
            <Paper>
            <h4 style={{paddingTop:"10px",marginLeft:"10px",marginBottom:"0px"}} className="person">{snippet.authorDisplayName}</h4>
            <p style={{paddingBottom:"10px",marginLeft:"10px"}}>{snippet.textDisplay}</p>
            </Paper>
          </div>
        );
      })}
      <div style={{ marginBottom: '20px' }} />
      <Snackbar open={successSnackbar.length > 0} onCloseEvent={deleteSnakbars} text={successSnackbar} />
      <Snackbar error open={errorSnackbar.length > 0} onCloseEvent={deleteSnakbars} text={errorSnackbar} />
    </div>
  );
};

export default UserVideosPage;
