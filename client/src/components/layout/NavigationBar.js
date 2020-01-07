import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
              <a
                href='https://www.khoa165.com/#contact'
                className='nav-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                DevContact
              </a>
            </NavItem>
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
