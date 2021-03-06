import React from 'react'
import { withRouter } from 'react-router'
import LaunchService from '../../app/service/launch-service'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import { messageError, messageSuccess } from '../../components/toast'
import LocalStorageService from '../../app/service/local-storage-service'

class LaunchRegister extends React.Component {


    constructor() {
        super()
        this.service = new LaunchService()
    }

    state = {
        id: '',
        description: '',
        value: '',
        month: '',
        year: '',
        type: '',
        status: '',
        updated: false
    }

    componentDidMount() {
        const params = this.props.match.params
        console.log(params)

        if (params.id) {
            this.service.findById(params.id)
                .then(response => {
                    this.setState({ ...response.data, updated: true })
                })
                .catch(error => {
                    messageError(error.response.data)
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    save = () => {

        const loggedUser = LocalStorageService.getItem('_user')
        const { description, value, month, year, type } = this.state
        const launch = { description, value, month, year, type, userId: loggedUser.id }
        
        try {
            this.service.validate(launch)
        } catch(error) {
            const messages = error.messages
            messages.forEach(msg => {
                messageError(msg) 
            })
            return false
        }

        this.service.save(launch)
            .then(response => {
                messageSuccess('Cadastrado com sucesso')
                this.props.history.push('/launch-search')

            })
            .catch(error => {
                messageError(error.response.data)
            })
    }

    update = () => {
        const { description, value, month, year, type, status, id } = this.state
        const launch = { description, value, month, year, type, status, id }

        this.service.update(launch)
            .then(response => {
                messageSuccess('Atualizado com sucesso')
                this.props.history.push('/launch-search')

            })
            .catch(error => {
                messageError(error.response.data)
            })
    }

    render() {
        const types = this.service.getTypes()
        const months = this.service.getMonths()

        return (
            <Card title={this.state.updated ? 'Atualizar lan??amento' : 'Cadastro de lan??amento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescription" label="Descri????o: *">
                            <input id="inputDescription"
                                type="text"
                                className="form-control"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.description} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputYear" label="Ano: *">
                            <input id="inputYear"
                                type="text"
                                className="form-control"
                                name="year"
                                onChange={this.handleChange}
                                value={this.state.year} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMonth" label="M??s: *">
                            <SelectMenu id="inputMonth"
                                className="form-control"
                                list={months}
                                name="month"
                                onChange={this.handleChange}
                                value={this.state.month} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValue" label="Valor: *">
                            <input id="inputValue"
                                type="text"
                                className="form-control"
                                name="value"
                                onChange={this.handleChange}
                                value={this.state.value} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputType" label="Tipo: *">
                            <SelectMenu id="inputType"
                                className="form-control"
                                list={types}
                                name="type"
                                onChange={this.handleChange}
                                value={this.state.type} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input id="inputStatus"
                                className="form-control"
                                type="text"
                                disabled={true}
                                name="status"
                                onChange={this.handleChange}
                                value={this.state.updated ? this.state.status : 'PENDENTE'} />
                        </FormGroup>
                    </div>



                </div>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.updated ? 
                                ( <button className="btn btn-success" onClick={this.update} ><i className="pi pi-refresh"></i> Atualizar</button> ) : 
                                ( <button className="btn btn-success" onClick={this.save} ><i className="pi pi-save"></i> Salvar</button> )
                        }
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/launch-search')} ><i className="pi pi-times"></i> Cancelar</button>
                    </div>

                </div>
            </Card>
        )

    }
}

export default withRouter(LaunchRegister)