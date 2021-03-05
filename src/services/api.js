import { BASE_URL } from './config.js'
import axios from 'axios'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

// Common function to do requests
export async function requests (url, method, data) {
  try {
    const res = await instance({
      url: url,
      method: method,
      data: data
    })
    return res.data
  } catch {
    return {
      code: 'E',
      error: 'Error processing your request, try again later'
    }
  }
}
