import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Creator: "",
  Title: "",
  Message: "",
  Tags: "",
  Image: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormState: {
      reducer: (state, action) => {
        return {
          ...state,
          [action.payload.fieldName]: action.payload.fieldValue,
        };
      },
      prepare: (fieldName, fieldValue) => {
        return {
          payload: { fieldName, fieldValue },
        };
      },
    },
    resetFormState: (state) => {
      let resetState = {
        ...initialState,
      };
      return resetState;
    },
  },
});

export default formSlice.reducer;
export const { resetFormState, updateFormState } = formSlice.actions;
