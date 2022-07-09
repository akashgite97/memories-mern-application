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
import { useTranslation } from "react-i18next";


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
  const {t} = useTranslation(['common'])

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
        {/* //<ReadonlyLabel variant="h6" label={formConstant.createMemory} /> */}
      <Typography variant="h6">{t(formConstant.createMemory)}</Typography>
        <TextField
          name={formConstant.Creator}
          label={t(formConstant.Creator)}
          variant="outlined"
          fullWidth
          value={formData.Creator}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Title}
          label={t(formConstant.Title)}
          variant="outlined"
          fullWidth
          value={formData.Title}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Message}
          label={t(formConstant.Message)}
          variant="outlined"
          fullWidth
          value={formData.Message}
          onChange={onInputChange}
        />
        <TextField
          name={formConstant.Tags}
          label={t(formConstant.Tags)}
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
          {postId ? t(formConstant.update) : t(formConstant.submit)}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleClear}
        >
          {t(formConstant.clear)}
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
