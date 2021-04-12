import React from 'react';
import {useSelector, connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Message} from 'semantic-ui-react'

import Container from '../../components/Container';
import DeleteClientButton from "./DeleteClientButton"
import listReducer from "./reducer"
import {REMOVE_ITEM} from '../constants';

// not default
export const List = () => {
  /*
  FYI useSelector: extract data from the Redux store state
  state: {clients: {…}, lookup: {…}} #The top keys clients and lookup come from combineReducers;
  # lookup value comes from lookupReducer(state = initialState...)
  # clients.lookupResults: coming from Lookup reducer: case LOOKUP_CLIENTS_SUCCESS
  clients: {clients: Array(0), loading: true, error: null, lookupLoading: false, lookupResults: Array(19)}
  lookup: {lookupLoading: false, lookupError: null, lookupResults: Array(19), lookupFields: {…}, lookupErrors: Array(0)}
  */
  // Get clients from lookup results
  const { clients} = useSelector((state) => ({
    clients: state.lookup.lookupResults
  }));

  const [state, dispatch] = React.useReducer(listReducer, {
    clients,
    isShowClients: true,
  });

  function handleRemove(id) {
    dispatch({ type: REMOVE_ITEM, id });
  }

  if (!state.isShowClients) {
    return null;
  }

  const renderLookupList = () => {
    const formattedList = [];

    const expired = [];
    state.clients .forEach(client => {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 30);
      const expiryDate = new Date(client.membership_expiry_date)

      if (client.membership_type && expiryDate > today && futureDate > expiryDate) {
        expired.push(`${client.first_name  } ${client.last_name}`);
      }

      formattedList.push(
        <tr id={client.id} key={client.id}>
          <td>
            <Link to={`/details/${client.id}`} key={client.id} data={client}>
              {client.first_name} {client.last_name}
            </Link>
          </td>
          <td>
            {client.address}
          </td>
          <td>
            <DeleteClientButton onDelete={handleRemove} clientId={client.id} />
          </td>
        </tr>
      );
    });

    return {formattedList, expired};
  }

  if (Array.isArray(state.clients ) && state.clients .length > 0) {
    const {formattedList, expired} = renderLookupList();

    let MessageExpired = null;
    if (expired.length) {
      MessageExpired = <Message
        color='red'
        error
        header='Membership of the following customers will expire in the next 30 days'
        list={expired}
      />
    }

    return (
      <Container>
        <Link className="btn bg-secondary text-white my-5" to="/">
              Back
        </Link>

        {MessageExpired}
        <h1>Clients Lookup Results LIst</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Address</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formattedList}
          </tbody>
        </table>
      </Container>
    );
  }

  return null;
}

// ~??? export default List;

function mapStateToProps(state) {
  /*
  {clients: {…}, lookup: {…}, list: null}
  clients:
    clients: []
    error: null
    loading: true
    lookupLoading: false
    lookupResults: (9)
  list: null

  lookup:
    lookupError: null
    lookupErrors: []
    lookupFields: {firstName: "v", lastName: "", phoneNumber: ""}
    lookupLoading: false
    lookupResults: Array(9)
   */
  return {
    clients: state.clients
  };
}

export default connect(mapStateToProps)(List);
