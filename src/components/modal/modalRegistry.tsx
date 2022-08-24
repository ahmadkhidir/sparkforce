import { ErrorModal, LoginModal, RegisterModal, SuccessModal, VerifyModal } from "./Modal";

export type ModalAction = (
    'login' | 'register' | 'verify' | 'success' | 'error'
)


export const Modal: {name: ModalAction, component: JSX.Element}[] = [
    {
        name: 'login',
        component: <LoginModal />
    },
    {
        name: 'verify',
        component: <VerifyModal />
    },
    {
        name: "register",
        component: <RegisterModal />
    },
    {
        name: "success",
        component: <SuccessModal />
    },
    {
        name: "error",
        component: <ErrorModal />
    }
]