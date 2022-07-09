import { getActionType } from "../../constant/constant";
import {
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE,
  DEFAULT_ACTION,
} from "../action-type-constant";

const defaultState = {
  hasError: false,
  errorMessage: "",
};

export const errorMessageReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
    case getActionType("REJECTED").REJECTED:  
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
      };
      break;  
    case CLEAR_ERROR_MESSAGE:
      return defaultState
      break;
    default:
      return state
  }
};
