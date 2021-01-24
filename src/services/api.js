import { BASE_URL } from "./config.js"
import axios from 'axios';

const instance = axios.create({
    baseURL: BASE_URL,
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
            error: "Error while trying to connect to server"
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
