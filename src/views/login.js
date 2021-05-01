import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UserService from '../app/service/user-service'
import LocalStorageService from '../app/service/local-storage-service'

class Login extends React.Component {

    constructor() {
        super()
        this.service = new UserService()
    }

    

    state = {
        email: '',
        password: '',
        messageError: null
    }
    
    login = () => {
        this.service.authenticate({
            email: this.state.email,
            password: this.state.password
        }).then( response => {
            LocalStorageService.addItem('_user', response.data)
            this.props.history.push('/home')
        }).catch( error => {
            this.setState({ messageError: error.response.data })
        })
    }

    signup = () => {
        this.props.history.push('/user-signup')
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{ this.state.messageError }</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                                <input type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={ this.login } className="btn btn-success">Entrar</button>
                                            <button className="btn btn-danger" onClick={ this.signup }>Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter (Login)