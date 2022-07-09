import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import ConnectedIntlProvider from './connected-intl-provider';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
    <App />
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root')
);
