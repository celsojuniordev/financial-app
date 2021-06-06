import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import AuthService from '../app/service/auth-service'
import Home from '../views/home'
import launchRegister from '../views/launch/launch-register'
import LaunchSearch from '../views/launch/launch-search'
import Login from '../views/login'
import UserSignup from '../views/user-signup'

function AuthenticateRoute({ component: Component, ...props }) {
    return(
        <Route {...props} render={ (componentProps) => {
            if(AuthService.isUserAuthenticated()) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return(
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location }}}/>
                )
            }
        } } />
    )
}

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/user-signup" component={ UserSignup } />

                <AuthenticateRoute path="/home" component={ Home } />
                <AuthenticateRoute path="/launch-search" component={ LaunchSearch } />
                <AuthenticateRoute path="/launch-register/:id?" component={ launchRegister } />
            </Switch>
        </HashRouter>
    )
}

export default Routes