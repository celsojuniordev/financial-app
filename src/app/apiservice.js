import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/api'
})

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    post(url, object) {
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, object)
    }

    put(url, object) {
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, object)
    }

    delete(url) {
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl)
    }

    get(url) {
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl)
    }
}

export default ApiService