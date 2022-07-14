import { getActionType } from "../../constant/constant";
import {
  CREATE_POST,
  DEFAULT_ACTION,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST
} from "../action-type-constant";

const defaultState = {
  posts: [],
  isLoading:true,
  error:"",
  postId:"",
  post:""
};

export const getAllPostReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(GET_ALL_POSTS).FETCHING:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case getActionType(GET_ALL_POSTS).FULFILLED:
      return {
        data: action.payload,
        isLoading: false,
        error: "",
      };
    case getActionType(GET_ALL_POSTS).REJECTED:
      return {
        data: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPostByIdReducer = (
  state = {},
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(GET_POST_BY_ID).FETCHING:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case getActionType(GET_POST_BY_ID).FULFILLED:
      return {
        data: action.payload,
        isLoading: false,
        error: "",
      };
    case getActionType(GET_POST_BY_ID).REJECTED:
      return {
        data: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPostReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(CREATE_POST).FETCHING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case getActionType(CREATE_POST).FULFILLED:
      return {
        data: action.payload.data,
        loading: true,
        error: "",
      };
    case getActionType(CREATE_POST).REJECTED:
      return {
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePostReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(UPDATE_POST).FETCHING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case getActionType(UPDATE_POST).FULFILLED:
      return {
        data: action.payload.data,
        loading: true,
        error: "",
      };
    case getActionType(UPDATE_POST).REJECTED:
      return {
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePostReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(LIKE_POST).FETCHING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case getActionType(DELETE_POST).FULFILLED:
      return state.posts.data.map(post=>post._id === action.payload._id ? action.payload : post  )
    case getActionType(DELETE_POST).REJECTED:
      return {
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const likePostReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case getActionType(LIKE_POST).FETCHING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case getActionType(LIKE_POST).FULFILLED:
      return {
        data: action.payload.data,
        loading: true,
        error: "",
      };
    case getActionType(LIKE_POST).REJECTED:
      return {
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

