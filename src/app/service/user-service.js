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
}

export default UserService