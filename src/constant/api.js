import axios from "axios";
import { SET_ERROR_MESSAGE } from "../store/action-type-constant";
import {getActionType, HTTP_METHOD } from "./constant";

//const url = 'http://localhost:5000/posts';

//export const fetchPosts = () => axios.get(url);

export const makeAPIRequest =
  (endpoint, method = HTTP_METHOD.GET, reqBody) =>
  async (dispatch = () => {}, actionKey = "") => {
    const ACTION_TYPES = getActionType(actionKey);

    dispatch({ type: ACTION_TYPES.FETCHING });

    try {
      await axios({
        url: endpoint,
        method: method,
        data: reqBody,
      }).then((response) => {
        /*    console.log("enter response",response) */
        dispatch({
          type: ACTION_TYPES.FULFILLED,
          payload: response.data,
          requestedURL: endpoint,
          actionKey,
        });
        return Promise.resolve(response.data);
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.REJECTED,
        payload: error,
        requestedURL: endpoint,
      });
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
