import React from "react";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const SubmitButton = props => {
  return (
    <div className={'submit-button'}>
        <Button style={{ width: 350, marginBottom:20. }} {...props} variant="contained" color="primary">
            {props.inProgress ? <CircularProgress className='circular-progress' /> : 'Submit'}
        </Button>
    </div>
  );
};

export default SubmitButton;
