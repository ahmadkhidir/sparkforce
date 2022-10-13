import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { closeAllModal, closeModal, openErrorModal, openModal, openSucessModal } from "../components/modal/modalSlice";
import { changePassword, checkUserValidity, forgotPassword, getOTP, login, logout, register, verifyForgotPassword } from "./api";


interface InitialState {
    user_token: string | null,
    error_message: string | undefined
    authenticated: boolean,
    credentials: null | {
        email: string | null,
        password: string | null
    },
    registrationUser: {
        email: string | undefined,
        password: string | undefined,
        first_name: string | undefined,
        last_name: string | undefined
    },
    registrationDetails: {
        phone: string | undefined,
        gender: string | undefined,
        age: string | undefined,
        country: string | undefined,
        country_state: string | undefined,
        address: string | undefined,
        nationality: string | undefined,
        channel: string | undefined,
    },
    regLoading: boolean,
    forgotPasswordData: {
        email?: string,
        otp?: string,
    }
}

const registrationUser = {
    email: undefined,
    password: undefined,
    first_name: undefined,
    last_name: undefined
}

const registrationDetails = {
    address: undefined,
    age: undefined,
    channel: undefined,
    country: undefined,
    country_state: undefined,
    gender: undefined,
    nationality: undefined,
    phone: undefined
}


export const loginAsync = createAsyncThunk(
    'auth/login',
    async (otp: string, { getState, dispatch }) => {
        // @ts-ignore
        const credentials = getState().auth.credentials
        try {
            const res = await login(credentials.email, credentials.password, otp)
            if (res.status === 200) {
                dispatch(closeModal('verify'))
            }
            localStorage.setItem('user_token', res.data.detail.token)
            const intv = setInterval(() => {
                // Wait  for localStorage to set the user_token
                const tkn = localStorage.getItem('user_token')
                if (tkn) {
                    dispatch(authSlice.actions.updateAuthenticated({ auth: true, token: res.data.detail.token }))
                    dispatch(authSlice.actions.updateCredentials(null))
                    clearInterval(intv)
                }
            }, 1000);

        } catch (error: any) {
            if (error.response.status === 401) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            if (error.response.status === 417) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            setTimeout(() => {
                dispatch(authSlice.actions.updateErrorMessage(undefined))
            }, 1000)
        }
    }
)

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (_, { getState, dispatch }) => {
        // @ts-ignore
        const _state = getState().auth
        const form = { user: _state.registrationUser, ..._state.registrationDetails }
        try {
            dispatch(updateRegLoading(true))
            const res = await register(form)
            console.log(res)
            dispatch(openSucessModal(['Your account has been created successfully. Kindly login with your credentials']))
            dispatch(authSlice.actions.clearRegistration())
            dispatch(closeModal('register'))
            // dispatch(openModal('success'))
            dispatch(updateRegLoading(false))
        } catch (error) {
            dispatch(updateRegLoading(false))
            dispatch(openErrorModal(["Sorry! Your account registration was not successful. Kindly try to register again."]))
        }
    }
)

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async () => {
        await logout()
    }
)

export const getOTPAsync = createAsyncThunk(
    'auth/getOTP',
    async (data: { email: string, password: string }, { dispatch }) => {
        try {
            const res = await getOTP(data.email, data.password)
            if (res.status === 200) {
                dispatch(authSlice.actions.updateCredentials(data))
                dispatch(closeModal('login'))
                dispatch(openModal('verify'))
            }
        } catch (error: any) {
            if (error.response.status === 401) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            if (error.response.status === 503) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            setTimeout(() => {
                dispatch(authSlice.actions.updateErrorMessage(undefined))
            }, 1000)
        }

    }
)

export const populateAuthAsync = createAsyncThunk(
    'auth/populate',
    async () => {
        const user_token = localStorage.getItem('user_token')
        const res = user_token && await checkUserValidity(user_token!)
        return res ? res.data.detail : false
    }
)

export const changePasswordAsync = createAsyncThunk(
    'auth/changePassword',
    async (data: { old_password: string, new_password: string }, { dispatch }) => {
        try {
            const res = await changePassword(data.old_password, data.new_password)
            if (res.data.detail === false) {
                dispatch(openErrorModal([res.data.message, false]))
            } else {
                dispatch(closeAllModal())
                dispatch(openSucessModal([res.data.message, false]))
            }
        } catch (error) {
            dispatch(openErrorModal(["Enexpected error, please try again later", false]))
        }

    }
)

export const verifyForgotPasswordAsync = createAsyncThunk(
    'auth/verifyForgotPassword',
    async (data: { email?: string, otp?: string }, { dispatch, getState }) => {
        // @ts-ignore
        let stored_data = getState().auth.forgotPasswordData;
        dispatch(authSlice.actions.updateForgotPasswordData({ email: data.email || stored_data.email, otp: data.otp }))
        try {
            const res = await verifyForgotPassword(data.email || stored_data.email, data.otp)
            if (res.data.detail === false) {
                // dispatch(openErrorModal([res.data.message, false]))
                dispatch(authSlice.actions.updateErrorMessage(res.data.message))
                setTimeout(() => {
                    dispatch(authSlice.actions.updateErrorMessage(undefined))
                }, 1000)
            } else {
                dispatch(closeAllModal())
                if (data.otp === undefined) {
                    dispatch(openModal('verify_forgot_password'))
                } else {
                    dispatch(openModal('forgot_password'))
                }
                // dispatch(openSucessModal([res.data.message, true]))
            }
        } catch (error) {
            // dispatch(openErrorModal(["Enexpected error, please try again later", false]))
            dispatch(authSlice.actions.updateErrorMessage("Enexpected error, please try again later"))
            setTimeout(() => {
                dispatch(authSlice.actions.updateErrorMessage(undefined))
            }, 1000)
        }

    }
)

export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgotPassword',
    async (data: { password: string }, { dispatch, getState }) => {
        // @ts-ignore
        let stored_data = getState().auth.forgotPasswordData;
        try {
            const res = await forgotPassword(stored_data.email, data.password, stored_data.otp)
            if (res.data.detail === false) {
                // dispatch(openErrorModal([res.data.message, false]))
                dispatch(authSlice.actions.updateErrorMessage(res.data.message))
                setTimeout(() => {
                    dispatch(authSlice.actions.updateErrorMessage(undefined))
                }, 1000)
            } else {
                dispatch(closeAllModal())
                dispatch(openSucessModal([res.data.message, true]))
                dispatch(authSlice.actions.updateForgotPasswordData({ email: undefined, otp: undefined }))
            }
        } catch (error) {
            dispatch(openErrorModal(["Enexpected error, please try again later", false]))
        }

    }
)

const initialState: InitialState = {
    user_token: null,
    error_message: undefined,
    authenticated: false,
    credentials: null,
    registrationUser: registrationUser,
    registrationDetails: registrationDetails,
    regLoading: false,
    forgotPasswordData: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateCredentials: (state, action) => {
            state.credentials = action.payload
        },
        updateErrorMessage: (state, action) => {
            state.error_message = action.payload
        },
        updateAuthenticated: (state, action) => {
            state.authenticated = action.payload.auth
            state.user_token = action.payload.token
        },
        regStep1: (state, action) => {
            state.registrationUser.email = action.payload.email
            state.registrationUser.password = action.payload.password
        },
        regStep2: (state, action) => {
            state.registrationUser.first_name = action.payload.first_name
            state.registrationUser.last_name = action.payload.last_name
            state.registrationDetails.phone = action.payload.phone
            state.registrationDetails.gender = action.payload.gender
        },
        regStep3: (state, action) => {
            state.registrationDetails.country = action.payload.country
            state.registrationDetails.country_state = action.payload.countryState
            state.registrationDetails.address = action.payload.address
            state.registrationDetails.nationality = action.payload.nationality
            state.registrationDetails.channel = action.payload.channel
        },
        updateRegLoading: (state, action) => {
            state.regLoading = action.payload
        },
        clearRegistration: (state) => {
            state.registrationUser = registrationUser
            state.registrationDetails = registrationDetails
        },
        updateForgotPasswordData: (state, action) => {
            state.forgotPasswordData.email = action.payload.email
            state.forgotPasswordData.otp = action.payload.otp
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(populateAuthAsync.fulfilled,
                (state, action) => {
                    if (action.payload === true) {
                        state.authenticated = true
                        state.user_token = localStorage.getItem('user_token')
                    }
                    else { localStorage.removeItem('user_token') }
                }
            )
            .addCase(logoutAsync.fulfilled,
                (state) => {
                    state.authenticated = false
                    state.user_token = null
                    localStorage.removeItem('user_token')
                },
            )
            .addMatcher(isAnyOf(
                getOTPAsync.pending,
                loginAsync.pending,
                changePasswordAsync.pending,
                verifyForgotPasswordAsync.pending,
                forgotPasswordAsync.pending,
            ),
                (state) => {
                    state.error_message = undefined
                }
            )
    }
})

export const { regStep1, regStep2, regStep3, updateRegLoading } = authSlice.actions
export default authSlice.reducer