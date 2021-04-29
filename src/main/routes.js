import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'
import UserSignup from '../views/user-signup'

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/user-signup" component={ UserSignup } />
                <Route path="/home" component={ Home } />
            </Switch>
        </HashRouter>
    )
}

export default Routes