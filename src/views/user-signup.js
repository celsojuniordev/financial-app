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


    validate() {
        const msg = []

        if(!this.state.name) {
            msg.push('Nome é obrigatório')
        }

        if(!this.state.email) {
            msg.push('Email é obrigatório')
        } else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msg.push('Email inválido')
        }

        if(!this.state.password || !this.state.confirmPassword) {
            msg.push('Senha é obrigatório')
        } else if(this.state.password !== this.state.confirmPassword) {
            msg.push('Confirmação de senha inválido')
        }

        return msg
    }


    signup = () => {
        const msgs = this.validate()

        if(msgs.length > 0) {
            msgs.forEach ( (msg, index) => {
                messageError(msg)
            })

            return false
        }

        const user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
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
                            <button onClick={this.signup} className="btn btn-success">Salvar</button>
                            <button onClick={this.cancel} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(UserSignup)