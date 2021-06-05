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
        status: ''
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

        this.service.save(launch)
            .then(response => {
                messageSuccess('Cadastrado com sucesso')
                this.props.history.push('/launch-search')

            })
            .catch(error => {
                messageError(error.response.data)
            })
        console.log(this.state)
    }

    render() {
        const types = this.service.getTypes()
        const months = this.service.getMonths()

        return (
            <Card title="Cadastrar lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescription" label="Descrição: *">
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
                        <FormGroup htmlFor="inputMonth" label="Mês: *">
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
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>



                </div>
                <div className="row">
                    <div>
                        <button className="btn btn-success" onClick={this.save} >Salvar</button>
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/launch-search')} >Cancelar</button>
                    </div>

                </div>
            </Card>
        )

    }
}

export default withRouter(LaunchRegister)