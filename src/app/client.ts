import axios from 'axios'

const token = localStorage.getItem('user_token')

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/v1/' : 'https://sparkforce-backend.herokuapp.com/v1/'

const _client = axios.create({baseURL: BASE_URL, headers: {
    'Authorization': `Token ${token!}`,
}})

interface ClientProps {
    url: string,
    data?: any,
    token?: string,
}

const GET = async (url: string, params?:any) => {
    return await _client.get(url, {params:params})
}

const POST = async (url: string, data?: any) => {
    return await _client.post(url, data)
}

const PUT = async (url: string, data?: any) => {
    return await _client.put(url, data)
}

const DELETE = async (url: string) => {
    return await _client.delete(url)
}

export default {GET, POST, PUT, DELETE}