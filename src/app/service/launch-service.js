import ApiService from "../apiservice";
import ValidationError from "../exception/validation-error"
class LaunchService extends ApiService {


    constructor() {
        super('/launchs')
    }

    save(Launch) {
        return this.post('/', Launch)
    }

    findById(id) {
        return this.get(`/${id}`)
    }

    update(launch) {
        return this.put(`/${launch.id}`, launch)
    }

    search(LaunchFilter) {
        let params = `?year=${LaunchFilter.year}`

        if (LaunchFilter.month) {
            params = `${params}&month=${LaunchFilter.month}`
        }
        if (LaunchFilter.type) {
            params = `${params}&type=${LaunchFilter.type}`
        }
        if (LaunchFilter.description) {
            params = `${params}&description=${LaunchFilter.description}`
        }
        if (LaunchFilter.userId) {
            params = `${params}&userId=${LaunchFilter.userId}`
        }

        return this.get(params)
    }

    deleteLaunch(id) {
        return this.delete(`/${id}`)
    }

    getMonths() {
        return [
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
            { label: 'Dezembro', value: 12 }
        ]
    }

    getTypes() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'Receita', value: 'RECEITA' },
            { label: 'Despesa', value: 'DESPESA' }
        ]
    }

    validate(launch) {
        const errors = []
        
        if(!launch.description) {
            errors.push("Descrição é obrigatório")
        }
        if(!launch.value) {
            errors.push("Valor é obrigatório")
        }
        if(!launch.month) {
            errors.push("Mês é obrigatório")
        }
        if(!launch.type) {
            errors.push("Tipo é obrigatório")
        }
        if(!launch.year) {
            errors.push("Ano é obrigatório")
        }

        if(errors) {
            throw new ValidationError(errors)
        }
    }

}


export default LaunchService