import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from '../views/login'
import UserSignup from '../views/user-signup'

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/user-signup" component={ UserSignup } />
            </Switch>
        </HashRouter>
    )
}

export default Routes