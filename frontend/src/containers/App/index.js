/**
 * App/index.js — Root Component & Route Definitions
 *
 * Wires all page-level containers together through React Router v5.
 * Uses connect() (legacy class-based binding) alongside the newer
 * useDispatch() hook — both patterns are demonstrated intentionally.
 *
 * ROUTE MAP:
 *   /          → Home (dashboard / navigation menu)
 *   /add       → Add (create a new client)
 *   /lookup    → Lookup (search clients by name / phone)
 *   /details/:id → Details (single client detail view)
 *   /list      → List (table of lookup results)
 *   /expire    → ToBeExpired (clients whose membership expires within 30 days)
 *
 * DATA FLOW:
 *   User clicks “Add Client” button in Add →
 *     App.onCreateClient() → dispatch(createClient(data)) →
 *     Add/actions.createClient (thunk) → POST /api/clients →
 *     dispatch(addClientSuccess) → addReducer updates state.add.clientAdded
 *
 * connect() vs hooks:
 *   mapStateToProps (below) maps state.clients → props.clients.
 *   Used here for reference/legacy pattern demonstration.
 *   Modern equivalent: const { clients } = useSelector(state => state.clients);
 */
import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GlobalStyle from './global-style';
import ErrorBoundary from '../../components/ErrorBoundary';
import Home from '../Home';
import {Add} from '../Add';
import Lookup from '../Lookup';
// not default export in List
import {List} from '../List';
import Details from "../Details";
import ToBeExpired from "../ToBeExpired";
import {createClient} from "../Add/actions";

const App = () => {
  // useDispatch() returns the store's dispatch function.
  // Calling dispatch(actionCreator()) triggers a state update.
  const dispatch = useDispatch();

  // Wrapper passed to <Add> so it can trigger a create without knowing
  // about Redux directly (separation of concerns: Add is a pure UI component).
  const onCreateClient = (clientData) => {
    dispatch(createClient(clientData));  // createClient is a thunk (async action)
  };

  return (
    // ErrorBoundary: catches any render-time JS errors in child components
    // and shows a fallback UI instead of crashing the whole app.
    <ErrorBoundary>
      <Router>
        <GlobalStyle />
        {/* Switch: renders only the first matching Route */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            {/* clientAdded=false: initial state; onCreateClient: Redux dispatch wrapper */}
            <Add dispatch={dispatch} clientAdded={false} onCreateClient={onCreateClient} />
          </Route>
          <Route path="/lookup">
            <Lookup />
          </Route>
          {/* component prop used for routes that need access to match/location/history props */}
          <Route path="/details/:id"  component={Details} />
          <Route path="/list">
            <List />
          </Route>
          <Route path="/expire">
            <ToBeExpired />
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

// mapStateToProps: maps the Redux state slice to component props.
// state.clients is the value managed by clientsSlice reducer.
// Legacy connect() pattern — modern equivalent is useSelector().
function mapStateToProps(state) {
  /*
  Full state shape for reference:
  {
    clients: { clients: [], loading: false, error: null },
    lookup:  { lookupFields: {firstName,lastName,phoneNumber}, lookupResults: null, ... },
    list:    null,
    add:     { clients: [], clientAdded: false }
  }
  */
  return {
    clients: state.clients  // exposes state.clients as this.props.clients
  };
}

export default connect(mapStateToProps)(App);
