import React from 'react';
import ReactDOM from 'react-dom';  // React 17 render API (replaced by createRoot in React 18)
import { configureStore } from '@reduxjs/toolkit';  // RTK: replaces legacy createStore + applyMiddleware
import { Provider } from 'react-redux';             // Injects the Redux store into the React component tree
import { createGlobalStyle } from 'styled-components'; // CSS-in-JS: injects global <style> into <head>
import App from './containers/App';
import Add from './containers/Add';
import rootReducer from './reducers';    // Combined reducer (see reducers.js)
import * as serviceWorker from './serviceWorker';

// ── REDUX STORE SETUP ─────────────────────────────────────────────
// configureStore (RTK) automatically:
//   - Enables Redux DevTools Extension in development mode
//   - Adds redux-thunk middleware (for async action creators in actions.js)
//   - Applies Immer so reducers can write "mutating" code that is actually immutable
//
// Alternative legacy approach:
//   import { createStore, applyMiddleware } from 'redux';
//   import thunk from 'redux-thunk';
//   import { composeWithDevTools } from 'redux-devtools-extension';
//   const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const store = configureStore({
  reducer: rootReducer,
});

// GlobalStyle injects a <style> tag at the <head> level on every render.
// This is the standard styled-components pattern for resetting/normalizing
// CSS that should apply to the whole document rather than a single component.
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

// <Provider store={store}> makes the Redux store available to every
// component in the tree via useSelector() and useDispatch().
// Without Provider, useSelector/useDispatch would throw an error.
ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// Service worker is unregistered by default (CRA default).
// Change to serviceWorker.register() to enable offline / PWA caching.
serviceWorker.unregister();
