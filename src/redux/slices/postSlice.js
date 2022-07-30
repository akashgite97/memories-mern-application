import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API } from "../../constant/api";
import { API_URL } from "../../constant/constant";

const initialState = {
  posts: [],
  isLoading: true,
  error: "",
  postId: "",
  post: "",
  currentPage:"",
  numberOfPages:""
};

//Get All Posts
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (page) => {
  return API.get(`${API_URL}/posts?page=${page}`).then((res) => res);
});

//Get PostByID
export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  return API.get(`${API_URL}/posts/${id}`).then((res) => res);
});

//Create Post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    return API.post(`${API_URL}/posts/create`, {
      title: formData.Title,
      creator: formData.Creator,
      image: formData.Image,
      tags: formData.Tags,
      message: formData.Message,
    });
  }
);

//Update Post
export const updatePost = createAsyncThunk("posts/updatePost", async (formData) => {
  const reqBody={
    creator:formData.Creator,
    title:formData.Title,
    message:formData.Message,
    tags:formData.Tags,
  }
  return API.put(`${API_URL}/posts/update/${formData.postId}`,reqBody)
});

//Delete Post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  return API
    .delete(`${API_URL}/posts/delete/${id}`)
    .then((res) => res);
});

//Like Post
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
    return API
      .patch(`${API_URL}/posts/${id}/like`)
      .then((res) => res);
  });

//Seacrh Post
export const getPostBySearch = createAsyncThunk("posts/getPostBySearch", async (searchQuery) => {
    return API
      .get(`${API_URL}/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
      .then((res) => res);
  });

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  extraReducers: (builder) => {
    //getAllPosts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
      state.error = "";
      state.currentPage = action.payload.currentPage;
      state.numberOfPages= action.payload.numberOfPages
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    //getPostById
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      state.error = "";
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.isLoading = false;
      state.post = "";
      state.error = action.error.message;
    });
    //createPost
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = "";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = "";
      state.error = action.error.message;
    });
    //updatePost
    builder.addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
      //deletePost
    builder.addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
      //likePost
    builder.addCase(likePost.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = "";
        state.error = action.error.message;
      });
    //likePost
    builder.addCase(getPostBySearch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostBySearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.posts = action.payload.data
    });
    builder.addCase(getPostBySearch.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = ''
      state.error = action.error.message;
    });  
  },
});

export default postSlice.reducer;
//module.exports.getAllPosts = getAllPosts
