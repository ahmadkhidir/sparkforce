import axios from 'axios'



const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/v1/' : 'https://sparkforce-app-wc9zp.ondigitalocean.app/v1/'

const _client = axios.create({baseURL: BASE_URL})

interface ClientProps {
    url: string,
    data?: any,
    token?: string,
}

const GET = async (url: string, params?: any) => {
    const token = localStorage.getItem('user_token')
    const headers = {
        'Authorization': token !== null ? `Token ${token}` : false,
        "Access-Control-Allow-Origin" : "*"
    }
    return await _client.get(url, {
        params: params,
        headers: headers
    })
}

const POST = async (url: string, data?: any) => {
    const token = localStorage.getItem('user_token')
    const headers = {
        'Authorization': token != null ? `Token ${token}` : false,
        "Access-Control-Allow-Origin" : "*"
    }
    return await _client.post(url, data, {headers: headers})
}

const PUT = async (url: string, data?: any) => {
    const token = localStorage.getItem('user_token')
    const headers = {
        'Authorization': token != null ? `Token ${token}` : false,
        "Access-Control-Allow-Origin" : "*"
    }
    return await _client.put(url, data, {headers: headers})
}

const DELETE = async (url: string) => {
    const token = localStorage.getItem('user_token')
    const headers = {
        'Authorization': token != null ? `Token ${token}` : false,
        "Access-Control-Allow-Origin" : "*"
    }
    return await _client.delete(url, {headers: headers})
}

export default { GET, POST, PUT, DELETE }