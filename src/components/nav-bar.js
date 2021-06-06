import React from 'react'
import AuthService from '../app/service/auth-service'
import { AuthConsumer } from '../main/authenticate-provider'
import NavBarItem from './nav-bar-item'

const logout = () => {
    AuthService.removeUserAuthenticated()
}

function NavBar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand" >Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUserAuthenticated} href="#/home" label="Home" />
                        <NavBarItem render={props.isUserAuthenticated} href="#/user-signup" label="Usuários" />
                        <NavBarItem render={props.isUserAuthenticated} href="#/launch-search" label="Lançamentos" />
                        <NavBarItem render={props.isUserAuthenticated} onClick={props.logout} href="#/login" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (
            <NavBar isUserAuthenticated={context.isAuthenticated} logout={context.closeSession} />
        ) }
    </AuthConsumer>
)