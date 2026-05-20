/**
 * store.js — Redux Store (RTK configureStore)
 *
 * This is the SINGLE store for the entire application.
 * configureStore() accepts a `reducer` map where each key becomes a
 * top-level slice of the Redux state tree:
 *
 *   store.getState() shape:
 *   {
 *     clients: { clients: [], loading: false, error: null }  ← clientsSlice.js
 *     lookup:  { lookupFields: {}, lookupResults: null, … } ← Lookup/reducer.js
 *     list:    { clients: null }                             ← List/reducer.js
 *     add:     { clients: [], clientAdded: false }           ← Add/reducer.js
 *   }
 *
 * NOTE: index.js also calls configureStore with rootReducer (from reducers.js).
 * That file uses combineReducers manually and produces the same shape.
 * This store.js is an alternative entry point kept for reference.
 */
import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./containers/clientsSlice";  // RTK slice: CRUD + async fetch
import lookupReducer from './containers/Lookup/reducer';   // search form fields + results
import addReducer from './containers/Add/reducer';         // add-client success/error
import listReducer from './containers/List/reducer';       // local list (REMOVE_ITEM)

export default configureStore({
  reducer: {
    clients: clientsReducer,  // manages the clients array fetched from API
    lookup:  lookupReducer,   // manages the search form + lookup results
    list:    listReducer,     // manages local removal of clients from the displayed list
    add:     addReducer,      // tracks newly added clients + any add errors
  },
});
