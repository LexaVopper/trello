import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './scss/main.scss';
import App from './App';
import { FirebaseContext, firebase } from './components/FirebaseApi';

import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={firebase}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
