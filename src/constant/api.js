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

  export const API = axios.create({baseURL:"http://localhost:5000"})
API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

