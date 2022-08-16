import { LoginModal, RegisterModal, VerifyModal } from "./Modal";

export type ModalAction = (
    'login' | 'register' | 'verify'
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
    }
]