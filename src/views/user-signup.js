import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UserService from '../app/service/user-service'
import { messageSuccess, messageError } from '../components/toast'

class UserSignup extends React.Component {

    constructor() {
        super()
        this.service = new UserService()
    }

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    signup = () => {
        const { email, name, password, confirmPassword } = this.state
        const user = { email, name, password, confirmPassword }

        try{
            this.service.validate(user)
        } catch(error) {
            const messages = error.messages
            messages.forEach( msg => {
                messageError(msg)
            })
            return false
        }

        this.service.signup(user)
            .then(response => {
                messageSuccess('Usuário cadastrado com sucesso!')
                this.props.history.push('/login')
            })
            .catch(error => {
                messageError(error.response.data)
            })
    }

    cancel = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputName">
                                <input className="form-control" type="text" id="inputName" name="name" onChange={e => this.setState({ name: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input className="form-control" type="email" id="inputEmail" name="email" onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputPassword">
                                <input className="form-control" type="password" id="inputPassword" name="password" onChange={e => this.setState({ password: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Confirmar senha: *" htmlFor="inputConfirmPassword">
                                <input className="form-control" type="password" id="inputConfirmPassword" name="confirmPassword" onChange={e => this.setState({ confirmPassword: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.signup} className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
                            <button onClick={this.cancel} className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(UserSignup)