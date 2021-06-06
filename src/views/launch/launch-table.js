import React from 'react'
import currency from 'currency-formatter'

export default props => {

const rows = props.launchs.map(launch => {
    return (
        <tr key={ launch.id }>
            <td>{ launch.description }</td>
            <td>{ currency.format(launch.value, { locale: 'pt-BR' }) }</td>
            <td>{ launch.type }</td>
            <td>{ launch.month }</td>
            <td>{ launch.status }</td>
            <td>

            <button title="Efetivar" disabled={launch.status !== 'PENDENTE'} onClick={e => props.updateStatus(launch, 'EFETIVADO')} type="button" className="btn btn-success"><i className="pi pi-check"></i></button>
            <button title="Cancelar" disabled={launch.status !== 'PENDENTE'} onClick={e => props.updateStatus(launch, 'CANCELADO')} type="button" className="btn btn-warning"><i className="pi pi-times"></i></button>    
            <button title="Editar" onClick={e => props.edit(launch.id)} type="button" className="btn btn-primary"><i className="pi pi-pencil"></i></button>
            <button title="Deletar" onClick={e => props.delete(launch)} type="button" className="btn btn-danger"><i className="pi pi-trash"></i></button>

            </td>
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