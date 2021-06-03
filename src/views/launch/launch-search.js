import React from 'react'
import { withRouter } from 'react-router-dom'
import LaunchService from '../../app/service/launch-service'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LaunchTable from './launch-table'
import LocalStorageService from '../../app/service/local-storage-service'
import * as messages from '../../components/toast'

class LaunchSearch extends React.Component {

    constructor() {
        super()
        this.service = new LaunchService()
    }

    state = {
        year: '',
        month: '',
        type: '',
        description: '',
        launchs: []
    }

    search = () => {
        if (!this.state.year) {
            messages.messageError('Ano é obrigatório')
            return false
        }
        const user = LocalStorageService.getItem('_user')

        const launchFilter = {
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            description: this.state.description,
            userId: user.id
        }

        this.service.search(launchFilter)
            .then(response => {
                this.setState({ launchs: response.data })
            }).catch(error => {
                messages.messageError(error.data)
            })
    }

    edit = (id) => {
        console.log("Edit ", id)
    }

    delete = (launch) => {
        this.service.deleteLaunch(launch.id)
            .then(response => {
                const launchs = this.state.launchs
                const index = launchs.indexOf(launch)
                launchs.splice(index, 1)
                this.setState(launchs)
                messages.messageSuccess("Deletado com sucesso")
            }).catch(error => {
                messages.messageError(error.data)
            })
    }

    render() {

        const month = this.service.getMonths()
        const launchType = this.service.getTypes()

        return (
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputYear">
                                <input type="text"
                                    className="form-control"
                                    id="inputYear"
                                    value={this.state.year}
                                    onChange={e => this.setState({ year: e.target.value })}
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup label="Mês: " htmlFor="inputMonth">
                                <SelectMenu id="inputMonth"
                                    className="form-control"
                                    list={month}
                                    value={this.state.month}
                                    onChange={e => this.setState({ month: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Descrição: " htmlFor="inputDescription">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescription"
                                    value={this.state.description}
                                    onChange={e => this.setState({ description: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <FormGroup label="Tipo: " htmlFor="inputType">
                                <SelectMenu id="inputType"
                                    className="form-control"
                                    list={launchType}
                                    value={this.state.type}
                                    onChange={e => this.setState({ type: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.search} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LaunchTable launchs={this.state.launchs} delete={this.delete} edit={this.edit} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(LaunchSearch)