// import React, { Component } from 'react'
// import { Route, Redirect, Switch } from 'react-router-dom'
// import AuthenticationService from '../services/AuthenticationService'
// import Login from './Login';
// // import { useHistory } from 'react-router-dom'

// class AuthenticatedRoute extends Component {

//     render() {

//         // debugger

//         if (AuthenticationService.isUserLoggedIn()) {
//             return <Route {...this.props} />
//         } else {
//             //return <Redirect to="/login" />
//             // const history = useHistory();
//             // return  history.push("/login");
//             return (
//                 <Switch>
//                     <Redirect from='/main/user' to='/login' />
//                     <Route path='/login'>
//                         <Login />
//                     </Route>
//                 </Switch>

//             );
//         }

//     }
// }

// export default AuthenticatedRoute

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../ultis/index';
// import AuthenticationService from '../services/AuthenticationService';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    // debugger
    return (

        <Route {...rest}
            render={
                 props => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)
                // props => (AuthenticationService.isUserLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)
            }
        />
    );
};

export default AuthenticatedRoute;

