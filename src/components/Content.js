import React, { Component } from 'react'
//  import routes from '../routes';
import { Route, Switch } from 'react-router-dom';
import User from '../pages/users/User';
import Customer from '../pages/customers/Customer';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import AuthenticatedRoute from '../pages/AuthenticatedRoute';

class Content extends Component {
   
    render() {
        return (
            <div className="content-wrapper">
                {/* {this.showContentMenu(routes)} */}
                <Switch>
                    <AuthenticatedRoute path="/main/customer" exact component={Customer} />
                    <AuthenticatedRoute component={User} path="/main/user" exact />
                    <AuthenticatedRoute path="/main/dashboard" component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>
            </div>

        )
    }


    // showContentMenu = (routes) => {
    //     var result = null;
    //     if (routes.length > 0) {
    //         result = routes.map((route, index) => {
    //             return (<Route
    //                 key={index}
    //                 path={route.path}
    //                 exact={route.exact}
    //                 component={route.main}
    //             />);
    //         });

    //     }
    //     return <Switch> {result} </Switch>
    // }

}
export default Content;
