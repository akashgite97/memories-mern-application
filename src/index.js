import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './i18n'
import { store } from './redux/store';
import axios from 'axios'

export const API_URL = axios.create({baseURL:"http://localhost:5000"})
API_URL.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
