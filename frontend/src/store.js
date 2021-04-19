import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./containers/clientsSlice";
import lookupReducer from './containers/Lookup/reducer';
import addReducer from './containers/Add/reducer';
import listReducer from './containers/List/reducer';

export default configureStore({
  reducer: {
    clients: clientsReducer,
    lookup: lookupReducer,
    list: listReducer,
    add: addReducer,
  },
});
