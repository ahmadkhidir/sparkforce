import client from '../app/client'


export async function getOTP(email: string, password: string) {
    return await client.POST('get_otp/', {
        email: email,
        password: password,
    })
}

export async function login(email: string, password: string, otp: string | number) {
    return await client.POST('login/', {
        email: email,
        password: password,
        otp: otp,
    })
}

export async function register(data: any) {
    return await client.POST('register/', data)
}

export async function checkUserValidity(token: string) {
    return await client.POST('check_user_validity/', {
        token: token
    })
}

export async function checkUserConflict(email: string) {
    return await client.POST('check_user_registration_conflict/', {
        email: email
    })
}