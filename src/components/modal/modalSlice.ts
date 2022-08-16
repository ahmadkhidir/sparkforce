import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalAction } from "./modalRegistry";

interface InitialState {
    current: ModalAction[]
}

const initialState: InitialState = {
    current: []
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalAction>) => {
            const i = state.current.findIndex(e => e === action.payload)
            if (i !== -1) {
                state.current.splice(i)
                state.current.push(action.payload)
            } else {
                state.current.push(action.payload)
            }
        },
        closeModal: (state, action: PayloadAction<ModalAction>) => {
            const i = state.current.findIndex(e => e === action.payload)
            if (i !== -1) {
                state.current.splice(i)
            }
        },
        closeAllModal: (state) => {
            state.current = []
        }
    }
})


export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer