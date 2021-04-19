import React from 'react';
import { Link } from "react-router-dom";
import {Button, ButtonGroup} from "react-bootstrap"
import Container from '../../components/Container';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../clients.module.css';

const Home = () => (
  <Container  className="btn-group btn-group-justified">
    <h1>Clients Management System</h1>
    <div className={styles.row}>
      <ButtonGroup vertical size="lg">
        <Link to="/lookup" className="btn-group">
          <Button className="btn-primary">Lookup</Button>
        </Link>
        <Link to="/expire" className="btn-group">
          <Button className="btn-warning">All To Be Expired</Button>
        </Link>
        <Link to="/add" className="btn-group">
          <Button className="btn-info">Add</Button>
        </Link>
      </ButtonGroup>
    </div>
  </Container>
);

export default Home;
