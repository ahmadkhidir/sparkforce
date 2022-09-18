import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { closeAllModal, closeModal, openErrorModal, openModal, openSucessModal } from "../components/modal/modalSlice";
import { changePassword, checkUserValidity, getOTP, login, register } from "./api";


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
            dispatch(authSlice.actions.updateAuthenticated({ auth: true, token: res.data.detail.token }))
            dispatch(authSlice.actions.updateCredentials(null))
            localStorage.setItem('user_token', res.data.detail.token)
        } catch (error: any) {
            if (error.response.status === 401) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            if (error.response.status === 417) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
        }
    }
)

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (_,{getState, dispatch}) => {
        // @ts-ignore
        const _state = getState().auth
        const form = {user: _state.registrationUser, ..._state.registrationDetails}
        try {
            dispatch(updateRegLoading(true))
            const res = await register(form)
            dispatch(openSucessModal(['Your account has been created successfully. Kindly login with your credentials']))
            dispatch(authSlice.actions.clearRegistration())
            dispatch(closeModal('register'))
            // dispatch(openModal('success'))
        } catch (error) {
            dispatch(updateRegLoading(false))
            dispatch(openErrorModal(["Sorry! Your account registration was not successful. Kindly try to register again."]))
        }
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
    async (data: {old_password: string, new_password: string}, {dispatch}) => {
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

const initialState: InitialState = {
    user_token: null,
    error_message: undefined,
    authenticated: false,
    credentials: null,
    registrationUser: registrationUser,
    registrationDetails: registrationDetails,
    regLoading: false
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
        logout: (state) => {
            state.authenticated = false
            state.user_token = null
            localStorage.removeItem('user_token')
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
            .addMatcher(isAnyOf(
                getOTPAsync.pending,
                loginAsync.pending,
                changePasswordAsync.pending,
            ),
                (state) => {
                    state.error_message = undefined
                }
            )
    }
})

export const { logout, regStep1, regStep2, regStep3, updateRegLoading } = authSlice.actions
export default authSlice.reducer