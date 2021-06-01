import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import IndexPage from '../pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <title>Fullstack app</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Helmet>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={IndexPage} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
