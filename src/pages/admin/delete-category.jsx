import React from "react";

import SubmitButton from "../../components/submit-button";
import * as axios from "axios";
import { API_BASE_URI } from "../../config";
import { getToken } from "../../helpers/get-token";
import CustomizedSnackbars from "../../components/snackbar/index";
import { Paper } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
}));

const CategoriesDeletePage = props => {
  const classes = useStyles();

  const [submittedError, setSubmittedError] = React.useState(false);
  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  const [category, setCategory] = React.useState('')
  const [categoriesOptions, setCategoriesOptions] = React.useState([]);

  
  React.useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URI}/categories`)
        
        setCategoriesOptions(response.data)      
      } catch(e) {
          // error
      }
  }


  const onSubmit = async () => {
    if (submitProgress) {
      return;
    }
    setSubmitInProgress(true);
    setSnackbarSuccessText("");
    if (category.length === 0) {
      setSubmitInProgress(false);
      setSnackbarErrorText("All fields are required");
      setSubmittedError(true);

      setTimeout(() => {
        setSnackbarSuccessText("");
        setSnackbarErrorText("");
      }, 10000);
      return;
    }
    setSnackbarErrorText("");

    try {
      await axios.delete(`${API_BASE_URI}/categories/${category}`, {
        headers: { authorization: `Bearer ${getToken()}` }
      });
      setSnackbarSuccessText("You Successfully deleted a category!");
    } catch (e) {
      setSnackbarErrorText("Something went wrong, please try again");
    }
    setSubmitInProgress(false);
    getCategories()
  };


  const categoryChange = async (e) => {
    setCategory(e.target.value)
  }

  const onSnackbarClose = () => {
    setSnackbarSuccessText("");
    setSnackbarErrorText("");
  };

  return (
    <div className={"page"}>
        <div className={classes.toolbar} />

        <Paper  elevation="0" style={{background: "#003366"}}>
      <h1
        style={{
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "Rubik",
          color: "white",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        Delete category
      </h1>
      </Paper>

      <FormControl variant="outlined" style={{marginTop:"30px"}}>
        <InputLabel id="dropdown">Category</InputLabel>
        <Select
          labelId="dropdown"
          id="dropdown"
          labelWidth={70}
          error={submittedError && category.length === 0}
          onChange={categoryChange}
        >
            {categoriesOptions.map((elt) => {
                return <MenuItem value={elt.id}>{elt.name}</MenuItem>
            })}
        </Select>
      </FormControl>

      <div className="split-20px"> </div>
      <div className="button-add-categories-center">
        <SubmitButton inProgress={submitProgress} onClick={onSubmit} />
      </div>
      <CustomizedSnackbars
        onCloseEvent={onSnackbarClose}
        open={snackbarSuccessText.length > 0}
        text={snackbarSuccessText}
      />
      <CustomizedSnackbars
        onCloseEvent={onSnackbarClose}
        open={snackbarErrorText.length > 0}
        error
        text={snackbarErrorText}
      />
    </div>
  );
};

export default CategoriesDeletePage;
