import React from "react";

import { DropzoneArea } from "material-ui-dropzone";
import TextField from "../../components/textfield";
import SubmitButton from "../../components/submit-button";
import ErrorBox from "../../components/error-box";
import * as axios from "axios";
import { API_BASE_URI, BASE_URL } from "../../config";
import { getToken } from "../../helpers/get-token";
import CustomizedSnackbars from "../../components/snackbar/index";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../fonts.css";
import {Paper} from "@material-ui/core";

const UploadPage = props => {
  const [inProgress, setInProgress] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [youtube_video_id, setYoutubeVideoID] = React.useState("");
  const [category, setCategory] = React.useState("");

  const [submittedError, setSubmittedError] = React.useState(false);
  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  const [categoriesOptions, setCategoriesOptions] = React.useState([]);

  React.useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URI}/categories`);
      const subcategories = response.data.filter(
        elt => elt.parent_category_id !== null
      );
      setCategoriesOptions(subcategories);
    } catch (e) {
      // error
    }
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const onSubmit = async () => {
    if (submitProgress) {
      return;
    }
    setSubmitInProgress(true);
    setSnackbarSuccessText("");
    if (
      title.length === 0 ||
      description.length === 0 ||
      category.length === 0 ||
      youtube_video_id.length === 0
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

    const body = {
      youtube_video_id,
      title,
      description,
      category
    };

    try {
      await axios.post(`${API_BASE_URI}/videos`, body, {
        headers: { authorization: `Bearer ${getToken()}` }
      });
      setSnackbarSuccessText("You Successfully uploaded the video!");
      window.location.href = `${BASE_URL}/videos`;
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
      <Paper>
      <h1
        style={{
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "Rubik",
          color: "#3f515",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        Upload video
      </h1>
      </Paper>
      <TextField
        error={submittedError && title.length === 0}
        value={title}
        className="title"
        onChange={onTitleChange}
        id="outlined-basic"
        label="Title"
        fullWidth
        variant="outlined"
      />
      <TextField
        error={submittedError && description.length === 0}
        value={description}
        id="description"
        onChange={onDescriptionChange}
        multiline
        rows={6}
        label="Description"
        fullWidth
        variant="outlined"
      />
      <TextField
        error={submittedError && youtube_video_id.length === 0}
        value={youtube_video_id}
        id="description"
        onChange={e => setYoutubeVideoID(e.target.value)}
        label="Youtube video id"
        fullWidth
        variant="outlined"
      />

      <FormControl variant="outlined" style={{ marginTop: "30px" }}>
        <InputLabel id="dropdown">Category</InputLabel>
        <Select
          labelId="dropdown"
          id="dropdown"
          labelWidth={70}
          value={category}
          error={submittedError && category.length === 0}
          onChange={e => setCategory(e.target.value)}
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

export default UploadPage;
