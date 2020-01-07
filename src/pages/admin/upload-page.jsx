import React from "react";

import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '../../components/textfield';
import SubmitButton from "../../components/submit-button";
import ErrorBox from "../../components/error-box";
import * as axios from 'axios';
import { API_BASE_URI, BASE_URL } from '../../config'
import { getToken } from '../../helpers/get-token'
import CustomizedSnackbars from '../../components/snackbar/index'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const UploadPage = (props) => {
    const [files, setFiles] = React.useState([]);
    const [inProgress, setInProgress] = React.useState(false);
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [submittedError, setSubmittedError] = React.useState(false);
    const [submitProgress, setSubmitInProgress] = React.useState(false);
    const [snackbarSuccessText, setSnackbarSuccessText] = React.useState('')
    const [snackbarErrorText, setSnackbarErrorText] = React.useState('')

    const [category, setCategory] = React.useState('')
    const [subCategory, setSubCategory] = React.useState('')

    const onChange = (data) => {
        setFiles(data)
        setInProgress(false)
    }
    const onDrop = () => {
        setInProgress(true)
    }
    const onFileChange = () => {
        setInProgress(false)
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const onSubmit = async () => {
        if (submitProgress) {
            return
        }
        setSubmitInProgress(true);
        setSnackbarSuccessText('');
        if(files.length === 0 || title.length === 0 || description.length === 0 || category.length === 0 || subCategory.length === 0) {
            setSubmitInProgress(false)
            setSnackbarErrorText('All fields are required');
            setSubmittedError(true)

            setTimeout(() => {
                setSnackbarSuccessText('');
                setSnackbarErrorText('');
            }, 10000)
            return
        }
        setSnackbarErrorText('');
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('subCategory', subCategory);

        try {
            await axios.post(`${API_BASE_URI}/upload`, formData, { headers: { authorization: `Bearer ${getToken()}` }})
            setSnackbarSuccessText('You Successfully uploaded a video!')
            window.location.href = `${BASE_URL}/videos`

        } catch (e) {
            setSnackbarErrorText('Something went wrong, please try again');
        }
        setSubmitInProgress(false)

    }

    const onSnackbarClose = () => {
        setSnackbarSuccessText('');
        setSnackbarErrorText('');
    }


  return (
    <div className={'page'}>
      <h1>Upload video</h1>
      <ErrorBox style={{
          //display: submittedError ? 'flex' : 'none',
          display: submittedError ? 'none' : 'none'
      }}/>
      <DropzoneArea
        filesLimit={1}
        onChange={onChange}
        acceptedFiles={['video/*']}
        dropzoneText={ !inProgress || files.length === 1 ? 'Drag and drop video here': 'Please wait upload is in progress'}
        maxFileSize={5000000000}
        onDrop={onDrop}
        onFileChange={onFileChange}
        />
        <TextField error={submittedError && title.length === 0 } value={title} className='title' onChange={onTitleChange} id="outlined-basic" label="Title" fullWidth variant="outlined" />
        <TextField error={submittedError && description.length === 0 } value={description} id="description" onChange={onDescriptionChange} multiline rows={6} label="Description" fullWidth variant="outlined" />
        <div className='split-20px'> </div>

        <FormControl variant="outlined" >
        <InputLabel id="dropdown">
          Category
        </InputLabel>
        <Select
          labelId="dropdown"
          id="dropdown"
          labelWidth={70}
          value={category}
          error={submittedError && category.length === 0 }
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div className='split-20px'> </div>
      <FormControl variant="outlined" >
        <InputLabel id="dropdown">
          Sub Category
        </InputLabel>
        <Select
           error={submittedError && subCategory.length === 0 }
          labelId="dropdown"
          id="dropdown"
          value={subCategory}
          labelWidth={90}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div className="button-add-categories-center">
        <SubmitButton inProgress={submitProgress} onClick={onSubmit} />
      </div>
        <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
        <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} />
    </div>
  );
};

export default UploadPage;
