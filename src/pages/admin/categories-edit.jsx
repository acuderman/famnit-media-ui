import React from "react";

import TextField from "../../components/textfield";
import SubmitButton from "../../components/submit-button";
import * as axios from "axios";
import { API_BASE_URI, BASE_URL } from "../../config";
import { getToken } from "../../helpers/get-token";
import CustomizedSnackbars from "../../components/snackbar/index";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const CategoriesEditPage = props => {
  const [submittedError, setSubmittedError] = React.useState(false);
  const [submitProgress, setSubmitInProgress] = React.useState(false);
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState([{
      title: "subcategrories",
      id: 1,
    }, {
        title: "subcategrories32",
        id: 2,
    }]);

    const [newSubCategory, setNewSubCategory] = React.useState([""]);

  const [forceUpdate, setForceUpdate] = React.useState(0);

  const onSubmit = async () => {
    if (submitProgress) {
      return;
    }
    setSubmitInProgress(true);
    setSnackbarSuccessText("");
    const subCategories = newSubCategory.filter((elt) => elt.length !== 0)
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

    // aditional subcategories
    const requestBody = {
      category,
      subCategories
    };

    try {
      await axios.put(`${API_BASE_URI}/upload`, requestBody, {
        headers: { authorization: `Bearer ${getToken()}` }
      });
      setSnackbarSuccessText("You Successfully added a category!");
      window.location.href = `${BASE_URL}/videos`;
    } catch (e) {
      setSnackbarErrorText("Something went wrong, please try again");
    }
    setSubmitInProgress(false);
  };

  const onSubCategoryChange = (value, i, id) => {
    const array = subCategory;
    array[i] = {
        title: value,
        id,
    };
    setSubCategory(array);
    setForceUpdate(forceUpdate + 1)
  };

  const onNewSubCategoryChange = (value, i) => {
    const array = newSubCategory;
    array[i] = value;
    if (array.indexOf("") === -1) {
      array.push("");
    }
    setNewSubCategory(array);
    setForceUpdate(forceUpdate + 1)
  };

  const onSnackbarClose = () => {
    setSnackbarSuccessText("");
    setSnackbarErrorText("");
  };

  const updateSubCategory = async (id) => {
    try {
        await axios.put(`${API_BASE_URI}/update`, {id}, {
          headers: { authorization: `Bearer ${getToken()}` }
        });
        setSnackbarSuccessText("You Successfully added a category!");
        window.location.href = `${BASE_URL}/videos`;
      } catch (e) {
        setSnackbarErrorText("Something went wrong, please try again");
      }
      setSubmitInProgress(false);
  }

  const deleteSubCategory = async (id, i) => {
    try {
        await axios.delete(`${API_BASE_URI}/delete-sub`, {
            id
        }, {
          headers: { authorization: `Bearer ${getToken()}` }
        });
        setSnackbarSuccessText("You Successfully removed sub category!");
      } catch (e) {
        setSnackbarErrorText("Something went wrong, please try again");
      }
      const arr = subCategory;
      arr.splice(i, i + 1)
      setForceUpdate(forceUpdate + 1)
      setSubCategory(arr)
  }
  

  const deleteNewSubCategory = async (i) => {
      const arr = newSubCategory;
      arr.splice(i, i + 1)
      setForceUpdate(forceUpdate + 1)
      setNewSubCategory(arr)
  }

  return (
    <div className={"page"}>
      <h1>Edit Category</h1>

    <p> First choose a category, you want to edit, then proceed by updating sub categories </p>
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
          <MenuItem value={10}>Photoshop</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

    <p className='edit-category-p'> You can edit or delete selected category. (All sub-categories also get deleted) </p>
      <TextField
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    {<SaveIcon style={{ cursor: 'pointer'}} onClick={() => {}}/>}
                    <DeleteIcon style={{ cursor: 'pointer'}} onClick={() => {}}/></InputAdornment>,
            }}
            value={'Photoshop'}
            id="description"
            label="Category"
            fullWidth
            variant="outlined"
            />
    <h4 className='sub-heading'> Existing sub categories </h4>
    <p className='edit-category-p'> Press save button to update the existing category or delete icon, to delete It </p>
      {subCategory.map((value, i) => {
        return (
          <TextField

            InputProps={{
                endAdornment: <InputAdornment position="end">
                    {value.id !== undefined ? <SaveIcon style={{ cursor: 'pointer'}} onClick={() => updateSubCategory(value.id, i)}/> : <span/> }
                    <DeleteIcon style={{ cursor: 'pointer'}} onClick={() => deleteSubCategory(value.id, i)}/></InputAdornment>,
            }}
            key={i}
            error={submittedError && value.length === 0}
            value={value.title}
            id="description"
            onChange={e => onSubCategoryChange(e.target.value, i, value.id)}
            label="Sub Category"
            fullWidth
            variant="outlined"
          />
        );
      })}
    <h4 className='sub-heading'>Add new sub category</h4>
    <p className='edit-category-p'>Start writing and add new sub categories, by pressiong on submit button</p>
{newSubCategory.map((value, i) => {
        return (
          <TextField
            InputProps={{
                endAdornment: <InputAdornment position="end">
            {i !== 0 ? <DeleteIcon style={{ cursor: 'pointer'}} onClick={() => deleteNewSubCategory(i)}/> : <span />}</InputAdornment>,
            }}
            key={i}
            error={submittedError && value.length === 0}
            value={value}
            id="description"
            onChange={e => onNewSubCategoryChange(e.target.value, i)}
            label="Sub Category"
            fullWidth
            variant="outlined"
          />
        );
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

export default CategoriesEditPage;
