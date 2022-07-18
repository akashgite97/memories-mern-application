import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { formConstant } from "./formConstant";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import {Formik} from 'formik'
import * as Yup from 'yup'
import {resetFormState,updateFormState } from '../../redux/slices/formSlice.js'
import { getPostById, createPost, getAllPosts, updatePost } from "../../redux/slices/postSlice";
import InputTextField from "../InputFileds/TextField";


const PostForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [isDisable, setDisable] = useState(true);
  const formData = useSelector((state) => state.form);
  const {post} = useSelector((state) => state.posts);

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
    if (formData.postId && !isDisable) {
     dispatch(updatePost(formData)).then(() => {
      toast.warn("Memory updated successfully")
      dispatch(resetFormState())
      dispatch(getAllPosts())
    })
    } else if(!isDisable) {
      dispatch(createPost(formData))
        .then(() => {
          dispatch(resetFormState())
          dispatch(getAllPosts())
        }).then(()=>{
          toast.success("Memory created successfully")
        })
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormState(name, value));
     if (name === formConstant.Creator) {
      if (value !== "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } 
  };

  const handleClear = (e) => {
    dispatch(resetFormState());
    setDisable(true);
  };

   useEffect(()=>{
    if(formData.postId){
      dispatch(getPostById(formData.postId)).then(()=>{
        dispatch(updateFormState(formConstant.Creator,post.data?.creator))
        dispatch(updateFormState(formConstant.Message,post.data?.message))
        dispatch(updateFormState(formConstant.Title,post.data?.title))
        dispatch(updateFormState(formConstant.Tags,post.data?.tags))
        dispatch(updateFormState(formConstant.Image,post.data?.image)) 
        setDisable(false);
      })
    }
  },[formData.postId, isDisable]) 

  return (
    <Paper className={classes.paper} elevation={4}>
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
          label={formConstant.Creator}
          value={formData.Creator}
          onChange={(e)=>onInputChange(e)}
          required
        />
        <InputTextField
          name={formConstant.Title}
          label={formConstant.Title}
          value={formData.Title}
          onChange={(e)=>onInputChange(e)}
        />
        <InputTextField
          name={formConstant.Message}
          label={formConstant.Message}
          value={formData.Message}
          onChange={onInputChange}
          required
        />
        <InputTextField
          name={formConstant.Tags}
          label={formConstant.Tags}
          value={formData.Tags}
          onChange={onInputChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              dispatch(updateFormState("Image", base64));
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
          {formData.postId ? t(formConstant.update) : t(formConstant.submit)}
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


export default PostForm
