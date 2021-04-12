import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GlobalStyle from './global-style';
import Home from '../Home';
import {Add} from '../Add';
import Lookup from '../Lookup';
// not default export in List
import {List} from '../List';
import Details from "../Details";
import ToBeExpired from "../ToBeExpired";
import {createClient} from "../Add/actions";

const App = () => {
  const dispatch = useDispatch();

  const onCreateClient = (clientData) => {
    dispatch(createClient(clientData));
  };

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add">
          <Add dispatch={dispatch} clientAdded={false} onCreateClient={onCreateClient} />
        </Route>
        <Route path="/lookup">
          <Lookup />
        </Route>
        <Route path="/details/:id"  component={Details} />
        <Route path="/list">
          <List />
        </Route>
        <Route path="/expire">
          <ToBeExpired />
        </Route>
      </Switch>
    </Router>
  );
}

// export default App;

function mapStateToProps(state) {
  /*
  {clients: {…}, lookup: {…}, list: null}
    clients: {clients: Array(0), loading: false, error: null}
    list: null
    lookup:
    lookupError: null
    lookupErrors: []
    lookupFields: {firstName: "", lastName: "", phoneNumber: ""}
    lookupLoading: false
    lookupResults: null
   */
  return {
    clients: state.clients
  };
}

export default connect(mapStateToProps)(App);
