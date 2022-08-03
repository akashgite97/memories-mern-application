import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { formConstant } from "./formConstant";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  resetFormState,
  updateFormState,
} from "../../redux/slices/formSlice.js";
import {
  getPostById,
  createPost,
  getAllPosts,
  updatePost,
} from "../../redux/slices/postSlice";
import InputTextField from "../InputFileds/TextField";
import { user } from "../../util";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDisable, setDisable] = useState(true);
  const formData = useSelector((state) => state.form);
  const { post } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.postId && !isDisable) {
      dispatch(updatePost(formData)).then(() => {
        toast.warn("Memory updated successfully");
        dispatch(resetFormState());
        dispatch(getAllPosts());
      });
    } else if (!isDisable) {
      dispatch(createPost(formData))
        .then((res) => {
          navigate(`/posts/${res?.payload?.data?._id}`);
          dispatch(resetFormState());
          dispatch(getAllPosts());
        })
        .then(() => {
          toast.success("Memory created successfully");
        });
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

  useEffect(() => {
    if (formData.postId) {
      dispatch(getPostById(formData.postId)).then(() => {
        dispatch(updateFormState(formConstant.Creator, post.data?.creator));
        dispatch(updateFormState(formConstant.Message, post.data?.message));
        dispatch(updateFormState(formConstant.Title, post.data?.title));
        dispatch(updateFormState(formConstant.Tags, post.data?.tags));
        dispatch(updateFormState(formConstant.Image, post.data?.image));
        setDisable(false);
      });
    }
  }, [formData.postId, isDisable]);

  return (
    <>
      {user?.result ? (
        <Paper className={classes.paper} elevation={4}>
          <form
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">{t(formConstant.createMemory)}</Typography>
            <InputTextField
              name={formConstant.Creator}
              label={formConstant.Creator}
              value={formData.Creator}
              onChange={(e) => onInputChange(e)}
              required
            />
            <InputTextField
              name={formConstant.Title}
              label={formConstant.Title}
              value={formData.Title}
              onChange={(e) => onInputChange(e)}
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
              {formData.postId
                ? t(formConstant.update)
                : t(formConstant.submit)}
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
      ) : (
        <Typography varint="h4" style={{ margin: "10px 0px" }}>
          Please sign in to create your own memory
          <br /> and like other's memories
        </Typography>
      )}
    </>
  );
};

export default PostForm;
