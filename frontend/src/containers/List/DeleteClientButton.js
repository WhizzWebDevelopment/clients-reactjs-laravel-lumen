import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

import {API_BASE_URL} from '../constants';

export default class DeleteClientButton extends Component {

  constructor (props) {
    super(props);
    this.state = {
      id: props.clientId,
      isUpdating: false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      isUpdating: true
    });

    const response = await fetch(`${API_BASE_URL  }/delete/${  this.state.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      }
    });

    await response;
    await this.setState({
      isUpdating: false
    });
    this.props.onDelete(this.state.id);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Button type='submit' loading={this.state.isUpdating}>Delete</Button>
      </Form>
    )
  }
};
