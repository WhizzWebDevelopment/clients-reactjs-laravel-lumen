import axios from 'axios';
import {
  SET_ADD_FIELD,
  SET_ADD_ERRORS,
  ADD_CLIENTS_INIT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  API_BASE_URL
} from '../constants';
import {lookupClientsError} from "../Lookup/actions"

export const createClient = clientData => dispatch => {
  const requestAdd = async () => {
    try {
      // Axios automatically serializes 2nd param object to JSON, also sets the Content-Type header to application/json
      // If 2nd param is preserialized JSON string to axios.post(), the Content-Type header needs set
      const response = await axios.post(`${API_BASE_URL}`, clientData);
      dispatch(addClientSuccess(response.data))
    } catch (error) {
      dispatch(addClientError(error));
    }
  }

  requestAdd();
}

export function addClientSuccess(client) {
  return {
    type: ADD_CLIENT_SUCCESS,
    client,
  };
}

export function addClientError(error) {
  return {
    type: ADD_CLIENT_ERROR,
    error,
  };
}
