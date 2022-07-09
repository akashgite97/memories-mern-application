import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { clearErrorMessage } from "../../store/actions/error-message-action";

const ErrorMessage = () => {
  const {hasError, errorMessage} = useSelector((state) => state.globalError);
  const dispatch = useDispatch();
  return (
    <div>
      {hasError && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => dispatch(clearErrorMessage())}
            >
              x
            </Button>
          }
        >
        {errorMessage.message!=="" ? errorMessage.message  : "Something went wrong! Please try aging"}
        </Alert>
      )}
    </div>
  );
};

export default ErrorMessage;
