import React from 'react'
import { withRouter } from 'react-router-dom'
import LaunchService from '../../app/service/launch-service'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LaunchTable from './launch-table'
import LocalStorageService from '../../app/service/local-storage-service'
import * as messages from '../../components/toast'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

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
        showConfirmDialog: false,
        launchDeleted: {},
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
        this.props.history.push(`/launch-register/${id}`)
    }

    updateStatus = (launch, status) => {
        launch.status = status
        this.service.update(launch)
        .then(response => {
            const launchs = this.state.launchs
            const index = launchs.indexOf(launch)
            
            launchs[index] = launch
            this.setState({ launch })
            messages.messageSuccess("Status atualizado com sucesso")
        }).catch(error => {
            messages.messageError(error.data)
        })
    }

    delete = () => {
        this.service.deleteLaunch(this.state.launchDeleted.id)
            .then(response => {
                const launchs = this.state.launchs
                const index = launchs.indexOf(this.state.launchDeleted)
                launchs.splice(index, 1)
                this.setState(launchs)
                this.setState({showConfirmDialog: false, launchDeleted: {}})

                messages.messageSuccess("Deletado com sucesso")
            }).catch(error => {
                messages.messageError(error.data)
            })
    }

    confirm = (launch) => {
        this.setState({showConfirmDialog: true, launchDeleted: launch})
    }

    cancelDelete = () => {
        this.setState({showConfirmDialog: false, launchDeleted: {}})
    }

    form = () => {
        this.props.history.push('/launch-register')
    }

    render() {

        const month = this.service.getMonths()
        const launchType = this.service.getTypes()

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.delete} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelDelete} />
            </div>
        )

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
                            <button onClick={this.form} type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LaunchTable launchs={this.state.launchs} delete={this.confirm} edit={this.edit} updateStatus={this.updateStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmar" 
                            visible={this.state.showConfirmDialog}
                            modal={true} 
                            footer={confirmDialogFooter}
                            style={{ width: '50vw' }} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        <p>Esta ação é irreversível. Deseja continuar ? </p>
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(LaunchSearch)