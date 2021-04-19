import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react'

import {Link, Redirect} from "react-router-dom"
import {API_BASE_URL, ADD_CLIENT_SUCCESS} from '../constants'
import Container from "../../components/Container"
import SelectMembershipType from "./MembershipType"
import {lookupClientsSuccess} from "../Lookup/actions"
import {addClientSuccess} from "./actions"
import StatusBlock from "../../components/StatusBlock"
import PropTypes from "prop-types"

export class Add extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      mailingAddress: '',
      membershipType: '',
      membershipExpiryDate: '',
      errorMessage: '',
      error: false,
      isLoading: false
    }
    this.updateFirstName = this.updateFirstName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMembershipTypeChange = this.handleMembershipTypeChange.bind(this);

    this.clientAdded = props.clientAdded || null;
    this.addError = props.addError || null;

    this.props = props;
  }

  updateFirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  updateLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  updatePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  updateAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  updateMailingAddress(e) {
    this.setState({
      mailingAddress: e.target.value
    })
  }

  updateMembershipType(e) {
    this.setState({
      membershipType: e.target.value
    })
  }

  updateMembershipExpiryDate(e) {
    this.setState({
      membershipExpiryDate: e.target.value || null
    })
  }

  resetForm() {
    this.setState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      mailingAddress: '',
      membershipType: '',
      membershipExpiryDate: '',
    });
  }

  onCreateClient = e => {
    e.preventDefault();
    this.props.onCreateClient({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      address: this.state.address,
      mailing_address: this.state.mailingAddress,
      membership_type: this.state.membershipType,
      membership_expiry_date: this.state.membershipExpiryDate || null,
    });

    this.resetForm();
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
      error: false,
      errorMessage: ''
    });

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "phone_number": this.state.phoneNumber,
        "address": this.state.address,
        "mailing_address": this.state.mailingAddress,
        "membership_type": this.state.membershipType,
        "membership_expiry_date": this.state.membershipExpiryDate || null,
      })
    });
    const client = await response.json();

    if (client.errors) {
      this.setState({
        isLoading: false,
        error: true,
        errorMessage: client.errors
      });
    } else {
      this.setState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        mailingAddress: '',
        membershipType: '',
        membershipExpiryDate: '',
        isLoading: false,
        error: false,
        errorMessage: ''
      });

      this.props.dispatch(addClientSuccess(client));
    }
  } //end async handleSubmit

  handleMembershipTypeChange(selectedMembershipType) {
    this.setState({membershipType: selectedMembershipType.value})
  }

  render() {
    if (this.clientAdded) {
      return <Redirect to="/list" />
    }

    return (
      <Container>
        <Link className="btn bg-secondary text-white my-5" to="/">
          Back
        </Link>

        <h1>Add Client</h1>
        <StatusBlock message={this.addError || ''} />

        <Form error={this.state.error} onSubmit={this.onCreateClient}>
          <Form.Field error={this.state.error}>
            <label htmlFor="firstName">First Name *:</label>
            <input id="firstName" type="text" placeholder='Required' value={this.state.firstName} onChange={this.updateFirstName}/>
            <label htmlFor="lastName">Last Name *:</label>
            <input id="lastName" type="text" placeholder='Required' value={this.state.lastName} onChange={this.updateLastName.bind(this)}/>

            <label htmlFor="phoneNumber">Phone number:</label>
            <input id="phoneNumber" type="text" placeholder='phone number' value={this.state.phoneNumber} onChange={this.updatePhoneNumber.bind(this)}/>

            <label htmlFor="address">Address *:</label>
            <input id="address" type="text" placeholder='Required' value={this.state.address} onChange={this.updateAddress.bind(this)}/>
            <label htmlFor="mailingAddress">Mailing Address:</label>
            <input id="mailingAddress" type="text" placeholder='mailing address' value={this.state.mailingAddress}
              onChange={this.updateMailingAddress.bind(this)}
            />

            <label htmlFor="membershipType">Membership type:</label>
            <SelectMembershipType onChange={this.handleMembershipTypeChange} />

            <label htmlFor="membershipExpiryDate">Membership expiry date:</label>
            <input id="membershipExpiryDate" type="text" placeholder='In format of YYYY-MM-DD' value={this.state.membershipExpiryDate}
              onChange={this.updateMembershipExpiryDate.bind(this)}
            />

            { this.state.error &&
                    <Message
                      error
                      header='Error creating client'
                      content={this.state.errorMessage}
                    />
            }
          </Form.Field>
          <Button type='submit' loading={this.state.isLoading}>Submit</Button>
        </Form>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients
  };
}

function mapDispatchToProps() {
  return {
    addClientSuccess
  };
}

// component will receive dispatch by default if the second argument to connect() is not specified.
//???W Add or List?
export default connect(mapStateToProps/*, mapDispatchToProps()*/)(Add);
