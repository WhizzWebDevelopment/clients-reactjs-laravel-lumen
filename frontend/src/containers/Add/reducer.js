import {CREATE_CLIENT, ADD_CLIENT_SUCCESS, ADD_CLIENT_ERROR} from "../constants"

export default function addReducer(state = {clients: []}, action) {
  switch (action.type) {
  case ADD_CLIENT_SUCCESS:
    return {
      clients: state.clients.concat(action.client),
      // ???initialize
      clientAdded: true
    };
  case ADD_CLIENT_ERROR:
    return {
      ...state,
      addError: action.error
    }
  default:
    // instead of throw new Error(), return the existing state unchanged
    return state || null;
  }
}
