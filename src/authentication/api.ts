import client from './client'


export async function getOTP(email: string, password: string) {
    return await client.POST('get_otp/', undefined, {
        email: email,
        password: password,
    })
}

export async function login(email: string, password: string, otp: string | number) {
    return await client.POST('login/', undefined, {
        email: email,
        password: password,
        otp: otp,
    })
}

export async function register(data: any) {
    return await client.POST('register/', undefined, data)
}

export async function checkUserValidity(token: string) {
    return await client.POST('check_user_validity/', undefined, {
        token: token
    })
}