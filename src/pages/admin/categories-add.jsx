import React from "react";

import TextField from "../../components/textfield";
import SubmitButton from "../../components/submit-button";
import * as axios from "axios";
import { API_BASE_URI, BASE_URL } from "../../config";
import { getToken } from "../../helpers/get-token";
import CustomizedSnackbars from "../../components/snackbar/index";

const CategoriesAddAdminPage = props => {
  const [submittedError, setSubmittedError] = React.useState(false);
  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState([{
      title: '',
      description: ''
  }]);

  const [forceUpdate, setForceUpdate] = React.useState(0);

  const onSubmit = async () => {
    if (submitProgress) {
      return;
    }
    setSubmitInProgress(true);
    setSnackbarSuccessText("");
    const subCategories = subCategory.filter((elt) => elt.title.length !== 0)
    if (category.length === 0 && subCategories.length !== 0) {
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

    const requestBody = {
      category,
      subCategories
    };

    try {
      await axios.post(`${API_BASE_URI}/upload`, requestBody, {
        headers: { authorization: `Bearer ${getToken()}` }
      });
      setSnackbarSuccessText("You Successfully added a category!");
      window.location.href = `${BASE_URL}/videos`;
    } catch (e) {
      setSnackbarErrorText("Something went wrong, please try again");
    }
    setSubmitInProgress(false);
  };

  const onSubCategoryChange = (value, i) => {
    const array = subCategory;
    array[i] = value;
    if (array.indexOf("") === -1) {
      array.push("");
    }
    setSubCategory(array);
    setForceUpdate(forceUpdate + 1)
  };

  const onSnackbarClose = () => {
    setSnackbarSuccessText("");
    setSnackbarErrorText("");
  };

  return (
    <div className={"page"}>
      <h1 style={{ marginBottom: 0 }}>Add Category</h1>
      <TextField
        error={submittedError && category.length === 0}
        value={category}
        className="title"
        onChange={e => setCategory(e.target.value)}
        id="outlined-basic"
        label="Category"
        fullWidth
        variant="outlined"
      />

      {subCategory.map((value, i) => {
        return [
          <TextField
            key={i}
            error={submittedError && value.length === 0}
            value={value}
            id="description"
            onChange={e => onSubCategoryChange(e.target.value, i)}
            label="Sub Category"
            fullWidth
            variant="outlined"
          />,
          <TextField
            key={i}
            multiline
            rows={6}
            error={submittedError && value.length === 0}
            value={value}
            id="description"
            onChange={e => onSubCategoryDescriptionChange(e.target.value, i)}
            label="Sub Category"
            fullWidth
            variant="outlined"
        />
      ];
      })}

      <div className="split-20px"> </div>
      <SubmitButton inProgress={submitProgress} onClick={onSubmit} />
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

export default CategoriesAddAdminPage;
