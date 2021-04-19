import { combineReducers } from 'redux';
import lookupReducer from './containers/Lookup/reducer';
import addReducer from './containers/Add/reducer';
// W You don't need to.
import listReducer from './containers/List/reducer';
import clientsReducer from "./containers/clientsSlice"

export default combineReducers({
  // key names here decides key names of state
  clients: clientsReducer,
  lookup: lookupReducer,
  list: listReducer,
  add: addReducer,
});
