import ApiService from "../apiservice";
import ValidationError from "../exception/validation-error";

class UserService extends ApiService {

    constructor() {
        super('/users')
    }

    authenticate(userLogin) {
        return this.post('/authenticate', userLogin)
    }

    getBalanceByUserId(id) {
        return this.get(`/${id}/balance`)
    }

    signup(user) {
        return this.post('/', user)
    }

    validate(user) {
        const errors = []

        if(!user.name) {
            errors.push('Nome é obrigatório')
        }

        if(!user.email) {
            errors.push('Email é obrigatório')
        } else if(!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Email inválido')
        }

        if(!user.password || !user.confirmPassword) {
            errors.push('Senha é obrigatório')
        } else if(user.password !== user.confirmPassword) {
            errors.push('Confirmação de senha inválido')
        }
        
        if(errors) {
            throw new ValidationError(errors)
        }
    }
}

export default UserService