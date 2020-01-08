import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { Form, Input } from 'reactstrap';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === '') {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form className='mb-3'>
      <Input
        ref={text}
        type='text'
        placeholder='Filter contacts'
        onChange={onChange}
      />
    </Form>
  );
};

export default ContactFilter;
