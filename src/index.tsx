import './theme/assets/sass/style.react.scss';

import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import ReactDOM from 'react-dom';

import { App } from './app/App';
import * as _redux from './setup';
import store, { persistor } from './setup/redux/Store';
import ErrorBoundary from 'theme/layout/core/ErrorBoundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Redux
// https://github.com/rt2zz/redux-persist
// Axios
// Apps
const { PUBLIC_URL, REACT_APP_EVN } = process.env

_redux.setupAxios(axios, store)

Chart.register(...registerables)

if (REACT_APP_EVN === 'production') {
  console.log = function () { };
  console.error = function () { };
  console.info = function () { };
  console.warn = function () { };
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
      <ErrorBoundary>
        <App basename={PUBLIC_URL} />
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

