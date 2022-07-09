import {
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE,
} from "../action-type-constant";

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
};

export const clearErrorMessage = () => {
  return {
    type: CLEAR_ERROR_MESSAGE,
  };
};
