import {
  SET_LOOKUP_FIELD,
  SET_LOOKUP_ERRORS,
  LOOKUP_CLIENTS_INIT,
  LOOKUP_CLIENTS_SUCCESS,
  LOOKUP_CLIENTS_ERROR,
} from '../constants';

const initialState = {
  lookupLoading: false,
  lookupError: null,
  lookupResults: null,
  lookupFields: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  lookupErrors: [],
};

export default function lookupReducer(state = initialState, action) {
  switch (action.type) {
  case SET_LOOKUP_FIELD:
    return {
      ...state,
      lookupFields: {
        ...state.lookupFields,
        [action.key]: action.value,
      }
    };
  case SET_LOOKUP_ERRORS:
    return {
      ...state,
      lookupErrors: action.errors,
    };
  case LOOKUP_CLIENTS_INIT:
    return {
      ...state,
      lookupLoading: true,
    };
  case LOOKUP_CLIENTS_SUCCESS:
    // state initial state is from function lookupReducer(state = initialState ......
    return {
      ...state,
      lookupLoading: false,
      // W action attribute results comes from function lookupClientsSuccess()
      lookupResults: action.results,
    };
  case LOOKUP_CLIENTS_ERROR:
    return {
      ...state,
      lookupLoading: false,
      lookupError: action.error,
    };
  default:
    return state;
  }
}
