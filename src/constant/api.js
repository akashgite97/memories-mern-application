import axios from "axios";
import { HTTP_METHOD } from "./constant";

export const makeAPIRequest = async (endpoint, method = HTTP_METHOD.GET, reqBody) =>{
    try {
      await axios({
        url: endpoint,
        method: method,
        data: reqBody,
      }).then((response) => {
        return Promise.resolve(response);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

