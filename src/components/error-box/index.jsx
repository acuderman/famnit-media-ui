import React from "react";
import ErrorIcon from '@material-ui/icons/Error';

const ErrorBox = props => {
    const {text, ...other} = props
  return (
    <div className='error-box' {...other}>
        <ErrorIcon fontSize='large' className='error-icon' />
        <div className='error-text' >{text === undefined ? 'All fields are required!': text}</div>
    </div>
  );
};

export default ErrorBox;