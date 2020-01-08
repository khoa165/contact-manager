import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/NavigationBar.scss';

const NavigationBar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <NavItem>
        <Link to='#!' className='nav-link' onClick={onLogout}>
          Logout
        </Link>
      </NavItem>
      <NavItem>
        <a
          href='https://www.khoa165.com/#contact'
          className='nav-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          DevContact
        </a>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </NavItem>
      <NavItem>
        <a
          href='https://www.khoa165.com/#contact'
          className='nav-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          DevContact
        </a>
      </NavItem>
    </Fragment>
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand='md' id='navbar'>
      <Container>
        <NavbarBrand tag={Link} to={'/'}>
          <i className={`${icon} mr-1`} /> {title}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link to='/home' className='nav-link'>
                Home
              </Link>
            </NavItem>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.defaultProps = {
  title: 'Contact Manager',
  icon: 'far fa-address-book'
};

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default NavigationBar;
