import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { setCurrent, clearCurrent, deleteContact } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    clearCurrent();
    deleteContact(id);
  };

  return (
    <Jumbotron>
      <h3 className='text-info'>
        {name}{' '}
        <span
          className={
            'float-right badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className='fas fa-envelope-open mr-2'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone mr-2'></i> {phone}
          </li>
        )}
      </ul>
      <p className='m-0'>
        <button
          className='btn btn-sm btn-info'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-sm btn-danger' onClick={onDelete}>
          Delete
        </button>
      </p>
    </Jumbotron>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
