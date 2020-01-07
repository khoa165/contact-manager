import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavigationBar from './components/layout/NavigationBar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <Router>
      <Fragment>
        <NavigationBar />
        <Container className=''>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
