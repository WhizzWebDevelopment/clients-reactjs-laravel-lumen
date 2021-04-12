import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import {Link, Redirect} from "react-router-dom";
import Container from '../../components/Container';
import ErrorBlock from '../../components/ErrorBlock';
import StatusBlock from '../../components/StatusBlock';
import {setLookupField, setLookupErrors, lookupClientsSuccess} from './actions';
// W
import {fetchClients} from "../clientsSlice";

const Lookup = () => {
  const [lookupStatus, setLookupStatus] = useState('idle')
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    phoneNumber,
    lookupFields,
    lookupErrors,
    lookupLoading,
    lookupError,
    lookupResults
  } = useSelector((state) => ({
    firstName: state.lookup.lookupFields.firstName,
    lastName: state.lookup.lookupFields.lastName,
    phoneNumber: state.lookup.lookupFields.phoneNumber,
    lookupFields: state.lookup.lookupFields,
    lookupErrors: state.lookup.lookupErrors,
    lookupLoading: state.lookup.lookupLoading,
    lookupError: state.lookup.lookupError,
    lookupResults: state.lookup.lookupResults,
  }));

  // validate australian phone number format
  const phoneNumberIsValid = text => /^(04|02|03|07|08)[0-9]{8}$/.test(text);

  const validateLookupFields = () => {
    const errors = [];

    if (firstName === '' && lastName === '' && phoneNumber === '') {
      errors.push('Please enter at least one condition');
    }

    if (phoneNumber !== '' && !phoneNumberIsValid(phoneNumber)) {
      errors.push('Please enter phoneNumber number in format of area code plus eight digits.');
    }

    dispatch(setLookupErrors(errors));

    if (errors.length === 0) {
      return true;
    }

    return false;
  }

  const handleChange = async (key, value) => {
    dispatch(setLookupField(key, value));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (lookupStatus === 'idle' && validateLookupFields()) {
      try {
        setLookupStatus('pending')
        const result = await dispatch(fetchClients(lookupFields));
        unwrapResult(result)
        // unwrapped result: {type: "clients/fetchClients/fulfilled", payload: Array(19)}.
        // You can only expose the result to List through dispatch as this is inside closure.

        // It's safter to dispatch success lookup result here rather than in fetchClients as await dispatch here.
        dispatch(lookupClientsSuccess(result.payload));
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setLookupStatus('idle')
      }
    }
  }

  // redirect to results page if results found
  // lookupResults comes from reducer: case LOOKUP_CLIENTS_SUCCESS
  if (Array.isArray(lookupResults) && lookupResults.length > 0) {
    return <Redirect to="/list" />
  }

  return (
    <Container>
      <Link className="btn bg-secondary text-white my-5" to="/">
        Back
      </Link>

      <h1>Clients Lookup Lookup</h1>
      <h2>At least one condition is needed.</h2>

      <StatusBlock message={lookupLoading ? 'Looking up...' : ''} />
      <StatusBlock message={lookupError || ''} />
      <StatusBlock message={(Array.isArray(lookupResults) && lookupResults.length === 0 && !lookupLoading) ? 'No client is found.' : ''} />
      <ErrorBlock errors={lookupErrors} />

      <form onSubmit={event => handleSubmit(event)}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" value={firstName} onChange={event => handleChange('firstName', event.target.value)} />

        <label htmlFor="lastName">LastName</label>
        <input id="lastName" type="text" value={lastName} onChange={event => handleChange('lastName', event.target.value)} />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="text" value={phoneNumber} onChange={event => handleChange('phoneNumber', event.target.value)} />

        <button type="submit">Lookup</button>
      </form>
    </Container>
  );
}

export default Lookup;
