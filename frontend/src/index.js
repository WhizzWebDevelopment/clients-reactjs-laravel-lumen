import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import App from './containers/App';
import Add from './containers/Add';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

/* W alternative way:
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

W 2nd alternative:
const store = createStore(rootReducer)
*/
const store = configureStore({
  reducer: rootReducer,
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 30;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", 
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
