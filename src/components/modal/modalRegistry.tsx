import { ChangePasswordModal, ErrorModal, LoginModal, RegisterModal, SuccessModal, VerifyModal } from "./Modal";

export type ModalAction = (
    'login' | 'register' | 'verify' | 'success' | 'error' | 'change_password'
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
    },
    {
        name: "change_password",
        component: <ChangePasswordModal />
    },
]