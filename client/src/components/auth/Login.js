import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid credentials. Please try again!') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
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
            <h3 className='text-center text-info mb-4'>Account Login</h3>
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
            <Input
              type='submit'
              value='Login'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
