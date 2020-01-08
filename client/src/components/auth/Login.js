import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
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
