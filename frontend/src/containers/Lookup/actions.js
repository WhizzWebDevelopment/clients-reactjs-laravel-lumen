import axios from 'axios';
import {
  SET_LOOKUP_FIELD,
  SET_LOOKUP_ERRORS,
  LOOKUP_CLIENTS_INIT,
  LOOKUP_CLIENTS_SUCCESS,
  LOOKUP_CLIENTS_ERROR,
  API_BASE_URL
} from '../constants';

export function setLookupField(key, value) {
  return {
    type: SET_LOOKUP_FIELD,
    key,
    value,
  };
}

export function setLookupErrors(errors) {
  return {
    type: SET_LOOKUP_ERRORS,
    errors,
  };
}

export function lookupClientsInit() {
  return {
    type: LOOKUP_CLIENTS_INIT,
  };
}

export function lookupClientsSuccess(results) {
  return {
    type: LOOKUP_CLIENTS_SUCCESS,
    // W same as results:results
    results,
  };
}

export function lookupClientsError(error) {
  return {
    type: LOOKUP_CLIENTS_ERROR,
    error,
  };
}

export const lookupClients = lookupFields => (dispatch) => {
  dispatch(lookupClientsInit());

  const requestLookup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL  }/lookup`, lookupFields);
      dispatch(lookupClientsSuccess(response.data));
    } catch (error) {
      dispatch(lookupClientsError(error));
    }
  }

  requestLookup();
}
