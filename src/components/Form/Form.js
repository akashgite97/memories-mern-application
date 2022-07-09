import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { connect } from "react-redux";
import {
  resetFormState,
  updateFormState,
} from "../../store/actions/form-action";
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
} from "../../store/actions/post-actions";
import { formConstant } from "./form-constant";
import { useSelector } from "react-redux";
import ReadonlyLabel from "../input-fields/ReadonlyLabel";

const Form = ({
  resetFormState,
  updateFormState,
  formData,
  createPost,
  getPosts,
  updatePost,
  getIndividualPost,
  getPostById
}) => {
  const classes = useStyles();
  const [isDisable, setDisable] = useState(true);
  const { postId } = useSelector((state) => state.form);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postId && !isDisable) {
     updatePost(postId, formData).then(() => {
      resetFormState();
      getPosts();
      setDisable(true);
    })
    } else if(!isDisable) {
      createPost(formData)
        .then(() => {
          resetFormState();
          getPosts();
        })
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    updateFormState(name, value);
    if (name == formConstant.Creator) {
      if (value !== "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  };

  const handleClear = (e) => {
    resetFormState();
    setDisable(true);
  };

   useEffect(()=>{
    if(postId){
      getPostById(postId).then(()=>{
        console.log(getIndividualPost,"getIndividualPost")
        updateFormState(formConstant.Creator,getIndividualPost?.creator)
        updateFormState(formConstant.Message,getIndividualPost?.message)
        updateFormState(formConstant.Title,getIndividualPost?.title)
        updateFormState(formConstant.Tags,getIndividualPost?.tags)
        updateFormState(formConstant.Image,getIndividualPost?.image)
        setDisable(false);
      })
    }
  },[postId, isDisable])

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={`${classes.root} ${classes.form}`}
      >
        <ReadonlyLabel variant="h6" label={formConstant.createMemory} />
        //<Typography variant="h6">{postId ? "Editing a Memory" :"Creating a Memory"}</Typography>
        <TextField
          name={formConstant.Creator}
          label={formConstant.Creator}
          variant="outlined"
          fullWidth
          value={formData.Creator}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Title}
          label={formConstant.Title}
          variant="outlined"
          fullWidth
          value={formData.Title}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Message}
          label={formConstant.Message}
          variant="outlined"
          fullWidth
          value={formData.Message}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Tags}
          label={formConstant.Tags}
          variant="outlined"
          fullWidth
          value={formData.Tags}
          onChange={onInputChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              updateFormState("Image", base64);
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          disabled={isDisable}
        >
          {postId ? "Update" : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
const mapStateToProps = (state) => ({
  formData: state.form,
  getIndividualPost:state.getIndividualPost.data
});
const mapDispatchToProps = {
  updateFormState,
  resetFormState,
  createPost,
  getPosts,
  updatePost,
  getPostById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
