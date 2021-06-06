import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Home from '../views/home'
import launchRegister from '../views/launch/launch-register'
import LaunchSearch from '../views/launch/launch-search'
import Login from '../views/login'
import UserSignup from '../views/user-signup'
import { AuthConsumer } from './authenticate-provider'

function AuthenticateRoute({ component: Component, isUserAuthenticated, ...props }) {
    return(
        <Route {...props} render={ (componentProps) => {
            if(isUserAuthenticated) {
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

function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/user-signup" component={ UserSignup } />

                <AuthenticateRoute isUserAuthenticated={props.isUserAuthenticated} path="/home" component={ Home } />
                <AuthenticateRoute isUserAuthenticated={props.isUserAuthenticated} path="/launch-search" component={ LaunchSearch } />
                <AuthenticateRoute isUserAuthenticated={props.isUserAuthenticated} path="/launch-register/:id?" component={ launchRegister } />
            </Switch>
        </HashRouter>
    )
}



export default () => (
    <AuthConsumer>
        { (context) => (
            <Routes isUserAuthenticated={context.isAuthenticated} />
        ) }
    </AuthConsumer>
)