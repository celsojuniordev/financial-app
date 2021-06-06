import React from 'react'
import AuthService from '../app/service/auth-service'
import NavBarItem from './nav-bar-item'

const logout = () => {
    AuthService.removeUserAuthenticated()
}

const userAuthenticated = () => {
    return AuthService.isUserAuthenticated()
}

function NavBar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand" >Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={userAuthenticated()} href="#/home" label="Home" />
                        <NavBarItem render={userAuthenticated()} href="#/user-signup" label="Usuários" />
                        <NavBarItem render={userAuthenticated()} href="#/launch-search" label="Lançamentos" />
                        <NavBarItem render={userAuthenticated()} onClick={logout} href="#/login" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar