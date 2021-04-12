import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import {API_BASE_URL} from './constants';

// W can replaced with clientsSlice.clients.fetchClients() ?
export const fetchClients = createAsyncThunk("clients/fetchClients", async (lookupFields) => {
  const response = await axios.post(`${API_BASE_URL  }/lookup`, lookupFields);
  const clients = await response.data;
  return clients;
});

// createSlice generates the corresponding action code automatically. The string from the name option is used as the first part of each action type, and the key name of each reducer function is used as the second:
// {type: "clients/clientAdded"}
// createSlice automatically generates action creators with the same names as the reducer functions we wrote, e.g clientsSlice.clients.clientUpdated()
// clientsSlice.reducer({YOUR-PAYLOAD}, clientsSlice.clients.clientUpdated())
const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null
  },
  reducers: {
    clientAdded(state, action) {
      state.clients.push(action.payload);
    },
    clientUpdated(state, action) {
      const { id, name, email } = action.payload;
      const existingClient = state.clients.find((client) => client.id === id);
      if (existingClient) {
        existingClient.name = name;
        existingClient.email = email;
      }
    },
    clientDeleted(state, action) {
      console.log('clientDeleted in clientsSlice'); // ~~~
      const { id } = action.payload;
      const existingClient = state.clients.find((client) => client.id === id);
      if (existingClient) {
        state.clients = state.clients.filter((client) => client.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchClients.fulfilled]: (state, action) => ({
      ...state,
      lookupLoading: false,
      lookupResults: action.payload,
    }),
    [fetchClients.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { clientAdded, clientUpdated, clientDeleted } = clientsSlice.actions;

// This is to export reducer which is used for dispatch (not something like clients/fetchClients/pending)
export default clientsSlice.reducer;
