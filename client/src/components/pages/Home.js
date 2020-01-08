import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { Row, Col } from 'reactstrap';

const Home = () => {
  return (
    <Row>
      <Col md='6'>
        <ContactForm />
      </Col>
      <Col md='6'>
        <ContactFilter />
        <Contacts />
      </Col>
    </Row>
  );
};

export default Home;
