import React from "react";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const SubmitButton = props => {
  return (
    <div className={'submit-button'}>
        <Button style={{ width: 130, height:45, marginBottom:20.,backgroundColor:"#F5F5F5",color:"black" }} {...props} variant="contained" color="primary">
            {props.inProgress ? <CircularProgress className='circular-progress' /> : 'Submit'}
        </Button>
    </div>
  );
};

export default SubmitButton;
