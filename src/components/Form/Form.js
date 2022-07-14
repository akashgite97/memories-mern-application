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
import { toast } from 'react-toastify';
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import InputTextField from "./TextField";

const PostForm = ({
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

  const initialFormValues={
    Creator: formData.Creator,
    Title: "",
    Message: "",
    Tags: "",
    Image: "",
  }

  const formValidationSchema=Yup.object().shape({
    Creator: Yup.string().required("This field is required"),
    Title:  Yup.string().required("This field is required"),
    Message: "",
    Tags: "",
    Image: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postId && !isDisable) {
     updatePost(postId, formData).then(() => {
      toast.warn("Memory updated successfully")
      resetFormState();
      getPosts();
      setDisable(true);
    })
    } else if(!isDisable) {
      createPost(formData)
        .then(() => {
          resetFormState();
          getPosts();
        }).then(()=>{
          toast.success("Memory created successfully")
        })
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    updateFormState(name, value);
    if (name === formConstant.Creator) {
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
      <Formik initialValues={{...initialFormValues}} 
              validationSchema={formValidationSchema}
           >
              {() => (
      <form
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
      >
      <Typography variant="h6">{t(formConstant.createMemory)}</Typography>
        <InputTextField
          name={formConstant.Creator}
          label={t(formConstant.Creator)}
          value={formData.Creator}
          onChange={(e)=>onInputChange(e)}
        />
        <InputTextField
          name={formConstant.Title}
          label={t(formConstant.Title)}
          value={formData.Title}
          onChange={(e)=>onInputChange(e)}
        />
        <InputTextField
          name={formConstant.Message}
          label={t(formConstant.Message)}
          value={formData.Message}
          onChange={onInputChange}
        />
        <InputTextField
          name={formConstant.Tags}
          label={t(formConstant.Tags)}
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
      </form>)}
      </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
