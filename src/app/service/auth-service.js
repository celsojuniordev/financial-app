import LocalStorageService from './local-storage-service'

export const LOGGEDD_USER = '_user'

export default class AuthService {

    static isUserAuthenticated() {
        const user = LocalStorageService.getItem(LOGGEDD_USER)
        return user && user.id
    }

    static removeUserAuthenticated() {
        LocalStorageService.removeItem(LOGGEDD_USER)
    }
}