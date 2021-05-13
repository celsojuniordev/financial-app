import ApiService from "../apiservice";

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
}

export default UserService