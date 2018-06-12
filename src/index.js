import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/index';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,
  document.getElementById('root'));
registerServiceWorker();
