import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LaunchTable from './launch-table'

class LaunchSearch extends React.Component {

    render() {

        const month = [
            { label: 'Selecione', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]

        const launchType = [
            { label: 'Selecione', value: '' },
            { label: 'Receita', value: 'RECEITA' },
            { label: 'Despesa', value: 'DESPESA' },
        ]

        const launch = [
            {id: 1, description: 'Salario', value: 1000, month: 1, type: 'Receita', status: 'EFETIVADO'}
        ]

        return (
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputYear">
                                <input type="text"
                                    className="form-control"
                                    id="inputYear"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup label="Mês: *" htmlFor="inputMonth">
                                <SelectMenu id="inputMonth" className="form-control" list={month} />
                            </FormGroup>
                            <FormGroup label="Tipo: *" htmlFor="inputType">
                                <SelectMenu id="inputType" className="form-control" list={launchType} />
                            </FormGroup>

                            <button type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LaunchTable launchs={launch}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(LaunchSearch)