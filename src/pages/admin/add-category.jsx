import React from "react";

import TextField from "../../components/textfield";
import SubmitButton from "../../components/submit-button";
import * as axios from "axios";
import { API_BASE_URI, BASE_URL } from "../../config";
import { getToken } from "../../helpers/get-token";
import CustomizedSnackbars from "../../components/snackbar/index";
import { Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const CategoriesAddAdminPage = props => {
  const [submittedError, setSubmittedError] = React.useState(false);
  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  const [name, setName] = React.useState("");
  const [description, setDescripton] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [parentCategory, setParentCategory] = React.useState("");
  const [icon_url, setIconUrl] = React.useState("");

  const [forceUpdate, setForceUpdate] = React.useState(0);

  const [categoriesOptions, setCategoriesOptions] = React.useState([]);

  React.useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URI}/categories`);
      const categoriesWithoutParent = response.data.filter(
        elt => elt.parent_category_id == null
      );
      setCategoriesOptions(categoriesWithoutParent);
    } catch (e) {
      // error
    }
  };

  const onSubmit = async () => {
    if (submitProgress) {
      return;
    }
    setSubmitInProgress(true);
    setSnackbarSuccessText("");
    if (
      name.length === 0 ||
      description.length === 0 ||
      slug.length === 0 ||
      icon_url.length === 0
    ) {
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
      name,
      description,
      slug,
      parent_category_id: parentCategory.length > 0 ? parentCategory : null,
      icon_url: icon_url.length > 0 ? icon_url : null
    };

    try {
      await axios.post(`${API_BASE_URI}/categories`, requestBody, {
        headers: { authorization: `Bearer ${getToken()}` }
      });
      setSnackbarSuccessText("You Successfully added a category!");
      setDescripton('');
      setName('');
      setParentCategory('');
      setSlug('');
      setIconUrl('')
    } catch (e) {
      setSnackbarErrorText("Something went wrong, please try again");
    }
    setSubmitInProgress(false);
  };

  const onSnackbarClose = () => {
    setSnackbarSuccessText("");
    setSnackbarErrorText("");
  };

  return (
    <div className={"page"}>
      <h1 style={{ marginBottom: 0 }}>Add Category</h1>
      <TextField
        error={submittedError && name.length === 0}
        value={name}
        className="title"
        onChange={e => setName(e.target.value)}
        id="outlined-basic"
        label="Name"
        fullWidth
        variant="outlined"
      />
      <TextField
        error={submittedError && description.length === 0}
        value={description}
        className="title"
        onChange={e => setDescripton(e.target.value)}
        id="outlined-basic"
        label="Description"
        fullWidth
        variant="outlined"
      />
      <TextField
        error={submittedError && slug.length === 0}
        value={slug}
        className="title"
        onChange={e => setSlug(e.target.value)}
        id="outlined-basic"
        label="Url Name (slug)"
        fullWidth
        variant="outlined"
      />
      <TextField
        error={submittedError && icon_url.length === 0}
        value={icon_url}
        className="title"
        onChange={e => setIconUrl(e.target.value)}
        id="outlined-basic"
        label="Icon url"
        fullWidth
        variant="outlined"
      />
      OPTIONAL
      <FormControl variant="outlined">
        <InputLabel id="dropdown">Parent Category</InputLabel>
        <Select
          labelId="dropdown"
          id="dropdown"
          labelWidth={70}
          error={false}
          onChange={e => setParentCategory(e.target.value)}
        >
          {categoriesOptions.map(elt => {
            return <MenuItem value={elt.id}>{elt.name}</MenuItem>;
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

export default CategoriesAddAdminPage;
