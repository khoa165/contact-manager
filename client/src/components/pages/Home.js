import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { Row, Col } from 'reactstrap';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
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
