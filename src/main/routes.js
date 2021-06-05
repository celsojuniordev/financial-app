import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from '../views/home'
import launchRegister from '../views/launch/launch-register'
import LaunchSearch from '../views/launch/launch-search'
import Login from '../views/login'
import UserSignup from '../views/user-signup'

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/user-signup" component={ UserSignup } />
                <Route path="/home" component={ Home } />
                <Route path="/launch-search" component={ LaunchSearch } />
                <Route path="/launch-register" component={ launchRegister } />
            </Switch>
        </HashRouter>
    )
}

export default Routes