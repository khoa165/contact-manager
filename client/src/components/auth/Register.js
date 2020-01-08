import React, { useState, useContext } from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  });

  const { name, email, password, confirmedPassword } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password.length < 6 || !/\d/.test(password)) {
      setAlert(
        'Password must be at least 6 characters and contain at least a number!',
        'danger'
      );
    } else if (password !== confirmedPassword) {
      setAlert('Passwords do not match', 'danger');
    }
  };

  return (
    <div>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          xl={{ size: 4, offset: 4 }}
        >
          <Form onSubmit={onSubmit}>
            <h3 className='text-center text-info mb-4'>Account Register</h3>
            <FormGroup>
              <Input
                type='text'
                name='name'
                value={name}
                placeholder='Please enter your name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Please enter a valid email'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='password'
                value={password}
                placeholder='Please enter a secure password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='confirmedPassword'
                value={confirmedPassword}
                placeholder='Please confirm your password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Register'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
