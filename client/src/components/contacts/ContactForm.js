import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ContactContext from '../../context/contact/contactContext';
import '../../styles/ContactForm.scss';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, updateContact, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => clearCurrent();

  return (
    <Row id='contactForm' className='mx-1 mb-4 mr-lg-3 text-info'>
      <Col lg={{ size: 10, offset: 1 }}>
        <Form onSubmit={onSubmit}>
          <h3 className='text-center mb-4'>
            {current ? 'Update contact' : 'Add new contact'}
          </h3>
          <FormGroup>
            <Input
              type='text'
              name='name'
              value={name}
              placeholder='Name'
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='text'
              name='phone'
              value={phone}
              placeholder='Phone'
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <h5>Contact types:</h5>
            <FormGroup check inline>
              <Label check>
                <Input
                  type='radio'
                  name='type'
                  value='personal'
                  checked={type === 'personal'}
                  onChange={onChange}
                />{' '}
                Personal
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type='radio'
                  name='type'
                  value='professional'
                  checked={type === 'professional'}
                  onChange={onChange}
                />{' '}
                Professional
              </Label>
            </FormGroup>
          </FormGroup>
          <Input
            type='submit'
            value='Submit'
            className='btn-outline-primary btn-block submitFormButton'
          />
          {current && (
            <Button color='info' outline block onClick={clearAll}>
              Clear
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default ContactForm;
