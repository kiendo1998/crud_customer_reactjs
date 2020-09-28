import React, { Component } from 'react';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import AuthenticatedRoute from './pages/AuthenticatedRoute';
import Login from './pages/logins/Login';


class App extends Component {
  render() {
    // debugger
    return (
      <Router>
        <div >
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <AuthenticatedRoute path="/main" component={Main} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );



  }

}




export default App;
