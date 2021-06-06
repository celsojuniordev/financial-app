import React from 'react'
import AuthService from '../app/service/auth-service'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class AuthenticateProvider extends React.Component {

    state = {
        userAuthenticated: null,
        isAuthenticated: false
    }

    startSession = (user) => {
        AuthService.login(user)
        this.setState({ isAuthenticated: true, userAuthenticated: user})
    }

    closeSession = () => {
        AuthService.removeUserAuthenticated()
        this.setState({ isAuthenticated: false, userAuthenticated: null})
    }

    render() {
        const context = {
            userAuthenticated: this.state.userAuthenticated,
            isAuthenticated: this.state.isAuthenticated,
            startSession: this.startSession,
            closeSession: this.closeSession
        }

        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticateProvider