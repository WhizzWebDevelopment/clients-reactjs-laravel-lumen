import {REMOVE_ITEM} from '../constants';

export default function ListReducer(state, action) {
  switch (action.type) {
  case REMOVE_ITEM:
    // state doesn't change as said reduer is pure function.
    return {
      ...state,
      clients: state.clients.filter((item) => item.id !== action.id),
    };
  default:
    // instead of throw new Error(), return the existing state unchanged
    return state || null;
  }
}
