import React from 'react'
import UserService from '../app/service/user-service'
import { AuthContext } from '../main/authenticate-provider'

class Home extends React.Component {

    constructor() {
        super()
        this.userService = new UserService()
    }
    state = {
        balance: 0
    }

    componentDidMount() {
        const user = this.context.userAuthenticated
        
        this.userService.getBalanceByUserId(user.id)
            .then( response => {
                this.setState({ balance: response.data })
            }).catch( error => {
                console.log(error.response)
            })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ { this.state.balance }</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/user-signup" role="button"><i className="pi pi-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="#/launch-register" role="button" ><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home