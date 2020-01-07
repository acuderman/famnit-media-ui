import React from "react";
import TextField from "@material-ui/core/TextField";

const Textfield = props => {
  return (
    <div className={'textfield'}>
      <TextField
        {...props}
        className="textfield"
        id="outlined-basic"
        fullWidth
        variant="outlined"
      />
    </div>
  );
};

export default Textfield;
