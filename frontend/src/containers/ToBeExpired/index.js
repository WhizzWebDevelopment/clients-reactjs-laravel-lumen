import React, { Component } from 'react';
import {Header, Message, Table} from 'semantic-ui-react';
import {Link} from "react-router-dom"
import {API_BASE_URL} from "../constants"

export default class ToBeExpired extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: null,
      isLoading: null
    };
  }

  componentDidMount() {
    this.getClients();
  }

  async getClients() {
    if (! this.state.clients) {
      try {
        this.setState({ isLoading: true });
        const response = await fetch(`${API_BASE_URL  }/expire`, {
        });
        const clients = await response.json();
        this.setState({ clients, isLoading: false});
      } catch (err) {
        this.setState({ isLoading: false });
        console.error(err);
      }
    }
  }

  render() {
    return (
      <div>
        <Link className="btn bg-secondary text-white my-5" to="/">
                  Back
        </Link>

        <Header as="h1">Clients to be expired within 30 days</Header>
        {this.state.isLoading && <Message info header="Loading clients..." />}
        {this.state.clients &&
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Client Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map(
                      client => client &&
                          <tr id={client.id} key={client.id}>
                            <td>
                              <Link to={`/details/${client.id}`} key={client.id}>
                                {client.first_name} {client.last_name}
                              </Link>
                            </td>

                          </tr>
                    )}
                  </tbody>
                </Table>
              </div>
        }
      </div>
    );
  }
};
