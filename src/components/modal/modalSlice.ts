import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalAction } from "./modalRegistry";

interface InitialState {
    current: ModalAction[],
    message: string | null
}

const initialState: InitialState = {
    current: [],
    message: null
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
        openSucessModal: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.current.push('success')
        },
        closeSucessModal: (state) => {
            state.message = null
            const i = state.current.indexOf("success")
            state.current.splice(i, 1)
        },
    }
})


export const {openModal, closeModal, closeAllModal, openSucessModal, closeSucessModal} = modalSlice.actions
export default modalSlice.reducer