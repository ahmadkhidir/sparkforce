import { ChangePasswordModal, ErrorModal, LoginModal, RegisterModal, ForgotPasswordModal, SuccessModal, VerifyModal, ForgotPasswordEmailModal, VerifyForgotPasswordModal } from "./Modal";

export type ModalAction = (
    'login' | 'register' | 'verify' | 'success' | 'error' | 'change_password' | 'forgot_password' | 'forgot_password_email' | 'verify_forgot_password'
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
    {
        name: "forgot_password",
        component: <ForgotPasswordModal />
    },
    {
        name: "forgot_password_email",
        component: <ForgotPasswordEmailModal />
    },
    {
        name: "verify_forgot_password",
        component: <VerifyForgotPasswordModal />
    },
]