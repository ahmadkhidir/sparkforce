import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/v1/' : 'https://sparkforce-backend.herokuapp.com/v1/'

const _client = axios.create({baseURL: BASE_URL})

interface ClientProps {
    url: string,
    data?: any,
    token?: string,
}

const GET = async (url: string, token?: string) => {
    return await _client.get(url, {
        headers: {
            'Authorization': token!,
            'X-Authorization': token!,
        }
    })
}

const POST = async (url: string, token?: string, data?: any) => {
    return await _client.post(url, data, {
        headers: token ? {
            'Authorization': token!,
            'X-Authorization': token!,
        } : undefined
    })
}

const PUT = async (url: string, token?: string, data?: any) => {
    return await _client.put(url, data, {
        headers: {
            'Authorization': token!,
            'X-Authorization': token!,
        }
    })
}

const DELETE = async (url: string, token?: string) => {
    return await _client.delete(url, {
        headers: {
            'Authorization': token!,
            'X-Authorization': token!,
        }
    })
}

export default {GET, POST, PUT, DELETE}