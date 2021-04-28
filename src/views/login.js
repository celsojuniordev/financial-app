import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'

class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }
    login = () => {
        console.log('Email: ', this.state.email)
        console.log('Password: ', this.state.password)
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                                    <input type="email" 
                                                           value={ this.state.email }
                                                           onChange={ e => this.setState({email: e.target.value}) }
                                                           className="form-control" 
                                                           id="exampleInputEmail1" 
                                                           aria-describedby="emailHelp" 
                                                           placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password" 
                                                           value={ this.state.password }
                                                           onChange={ e => this.setState({password: e.target.value}) }
                                                           className="form-control" 
                                                           id="exampleInputPassword1" 
                                                           placeholder="Password" />
                                                </FormGroup>
                                                <button onClick={ this.login } className="btn btn-success">Entrar</button>
                                                <button className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login