import { BASE_URL } from "./config.js"
import axios from 'axios';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true
})

// Common function to do requests
export async function requests(url, method, data) {
    try {
        const res = await instance({
            method: method,
            url: url,
            data: data
        })
        return res.data
    }
    catch {
        return {
            code: "E",
            error: "Ha habido un error al conectar con el servidor"
        }
    }
}

export function hasPredifinedURL() {
    if (process.env.VUE_APP_SERVER) {
        return true
    }
    else {
        return false
    }
}