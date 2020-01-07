/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import GoogleAuth from "../../components/admin";
import Snackbar from "../../components/snackbar";
import { GOOGLE_API_BASE_URL, GOOGLE_AUTH_API_BASE_URL , YOUTUBE_API_KEY } from "../../config";
import * as axios from "axios";
import TextField from '@material-ui/core/TextField';
import * as Cookies from 'js-cookie';
import SendIcon from '@material-ui/icons/Send';
import {
    Link
} from 'react-router-dom';

const UserVideosPage = props => {
  const { video_id } = props.match.params;
  const [comments, setComments] = React.useState([]);
  const [access_token, setAccessToken] = React.useState(undefined)
  const [comment, setComment] = React.useState('');
  const [successSnackbar, setSuccessSnackbar] = React.useState('')
  const [errorSnackbar, setErrorSnackbar] = React.useState('')
  

  const [title, setTitle] = React.useState('title')
  const [description, setDescription] = React.useState('description')

  const getComments = async () => {
    const comments = await axios.get(
      `${GOOGLE_API_BASE_URL}/commentThreads?key=${YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=100`
    );
    setComments(comments.data.items);
  };

  React.useEffect(() => {
    getComments();
    verifyAccessToken()
  }, []);

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
  
  const commentInput = access_token !== undefined 
  ? <div className='post-comment'><TextField value={comment} style={{ width: '90%' }} onChange={onCommentChange} id="standard-basic" label="Add a comment" /> <span className='send-icon'><SendIcon onClick={onSubmit}/></span> </div>
  : <div className='comment'> <h4> if you want to comment, you need to log in </h4> <GoogleAuth onSignInResponse={onAuthResponse} /> </div>

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
      <div className='nav-buttons'>
      <Link className='video-navigation-buttons' to={''}>Previous video</Link>
      <Link className='video-navigation-buttons' to={''}>Next video</Link>
        </div>
        <div className={'split-40px'}> </div>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <div className={'split-80px'}> </div>
      <h2>Comments</h2>
      {commentInput}
      {comments.map(comment => {
        console.log(comment);
        const snippet = comment.snippet.topLevelComment.snippet;
        return (
          <div className="youtube-comment">
            <h4 className="person">{snippet.authorDisplayName}</h4>
            <p>{snippet.textDisplay}</p>
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
