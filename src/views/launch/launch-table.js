import React from 'react'

export default props => {

const rows = props.launchs.map(launch => {
    return (
        <tr key={ launch.id }>
            <td>{ launch.description }</td>
            <td>{ launch.value }</td>
            <td>{ launch.type }</td>
            <td>{ launch.month }</td>
            <td>{ launch.status }</td>
            <td></td>
        </tr>
    )
})

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                    { rows }
                </tbody>
        </table>
    )
}