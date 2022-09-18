import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalAction } from "./modalRegistry";

interface InitialState {
    current: ModalAction[],
    message: string | null,
    show_login: boolean,
}

const initialState: InitialState = {
    current: [],
    message: null,
    show_login: true
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalAction>) => {
            const i = state.current.indexOf(action.payload)
            if (i !== -1) {
                state.current.splice(i, 1)
                state.current.push(action.payload)
            } else {
                state.current.push(action.payload)
            }
        },
        closeModal: (state, action: PayloadAction<ModalAction>) => {
            const i = state.current.indexOf(action.payload)
            if (i !== -1) {
                state.current.splice(i, 1)
            }
        },
        closeAllModal: (state) => {
            state.current = []
        },
        openSucessModal: (state, action: PayloadAction<[message: string, show_login?: boolean]>) => {
            state.message = action.payload[0]
            state.show_login = action.payload[1] !== undefined ? action.payload[1] : true
            state.current.push('success')
        },
        closeSucessModal: (state) => {
            state.message = null
            const i = state.current.indexOf("success")
            state.current.splice(i, 1)
        },
        openErrorModal: (state, action: PayloadAction<[message: string, show_login?: boolean]>) => {
            state.message = action.payload[0]
            state.show_login = action.payload[1] !== undefined ? action.payload[1] : true
            state.current.push('error')
        },
        closeErrorModal: (state) => {
            state.message = null
            const i = state.current.indexOf("error")
            state.current.splice(i, 1)
        },
    }
})


export const { openModal, closeModal, closeAllModal, openSucessModal, closeSucessModal, openErrorModal, closeErrorModal } = modalSlice.actions
export default modalSlice.reducer