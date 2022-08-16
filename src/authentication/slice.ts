import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { closeModal, openModal } from "../components/modal/modalSlice";
import { checkUserValidity, getOTP, login } from "./api";


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
            dispatch(authSlice.actions.updateAuthenticated({auth:true, token:res.data.detail.token}))
            dispatch(authSlice.actions.updateCredentials(null))
            localStorage.setItem('user_token', res.data.detail.token)
        } catch (error: any) {
            if (error.response.status === 401) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
            if (error.response.status === 417) { dispatch(authSlice.actions.updateErrorMessage(error.response.data.detail)) }
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
        const res = await checkUserValidity(user_token!)
        return res.data.detail
    }
)

interface InitialState {
    user_token: string | null,
    error_message: string | null
    authenticated: boolean,
    credentials: null | {
        email: string | null,
        password: string | null
    }
}

const initialState: InitialState = {
    user_token: null,
    error_message: null,
    authenticated: false,
    credentials: null
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
        updateAuthenticated: (state,action) => {
            state.authenticated = action.payload.auth
            state.user_token = action.payload.token
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(populateAuthAsync.fulfilled,
                (state, action) => {
                    if (action.payload) {
                        state.authenticated = action.payload
                        state.user_token = localStorage.getItem('user_token')
                    }
                    else {localStorage.removeItem('user_token')}
                }
            )
            .addMatcher(isAnyOf(
                getOTPAsync.pending,
                loginAsync.pending
            ),
                (state) => {
                    state.error_message = null
                }
            )
    }
})

// export const { } = authSlice.actions
export default authSlice.reducer