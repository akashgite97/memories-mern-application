import { DEFAULT_ACTION, RESET_STATE, UPDATE_FORM_STATE } from "../action-type-constant";

const initialState = {
  Creator: "",
  Title: "",
  Message: "",
  Tags: "",
  Image: "",
};

export const formReducer = (state =  initialState , action=DEFAULT_ACTION) => {
  let updateFormState, resetState;
  switch (action.type) {
    case UPDATE_FORM_STATE:
      updateFormState = {
        ...state,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
      return updateFormState;
    case RESET_STATE:
      resetState = {
        ...initialState,
      };
      return resetState;
    default:
      return state;
  }
};
