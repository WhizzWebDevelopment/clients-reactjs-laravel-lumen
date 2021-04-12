import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./containers/clientsSlice";

// W Not really used
export default configureStore({
  reducer: {
    clients: clientsReducer,
  },
});
