import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Message} from 'semantic-ui-react';
import { Container, Card, ListGroup } from "react-bootstrap";

import {API_BASE_URL} from "../constants"

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      isLoading: null
    };
    console.log('props:', props, this.props);
    // eslint-disable-next-line react/prop-types
    this.id = props.match.params.id;
  }

  componentDidMount() {
    this.getClient();
  }

  async getClient() {
    if (! this.state.client) {
      try {
        this.setState({ isLoading: true });
        const response = await fetch(`${API_BASE_URL  }/details/${  this.id}`, {
        });
        const client = await response.json();
        this.setState({ client, isLoading: false});
      } catch (err) {
        this.setState({ isLoading: false });
        console.error(err);
      }
    }
  }

  render() {
    if (this.state.client) {
      const {
        // eslint-disable-next-line no-unused-vars
        id,
        first_name,
        last_name,
        phone_number,
        membership_type,
        membership_expiry_date,
        address,
        mailing_address,
        created_at,
        updated_at
      } = this.state.client;
      return (
        <Container className="mb-5">
          <Link className="btn bg-secondary text-white my-5" to="/">
            Back
          </Link>

          <Card>
            <Card.Header>
              <h2 className="text-primary text-center">
                {first_name} {last_name}
              </h2>
            </Card.Header>
            {membership_type &&
                          <ListGroup>
                            <ListGroup.Item>
                              <i className="fas fa-mobile-alt mr-2"/>
                              <strong>Phone: </strong> {phone_number}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Membership type: </strong> {membership_type}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Membership expiry date: </strong> {membership_expiry_date}
                            </ListGroup.Item>
                          </ListGroup>
            }

            <ListGroup>
              <ListGroup.Item>
                <strong>Address: </strong>
                {address}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mailing address: </strong>
                {mailing_address}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body/>

          </Card>
        </Container>
      );
    }

    return <Message info header="Loading client..."/>
  }
};
