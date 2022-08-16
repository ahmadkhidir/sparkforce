import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './Modal.module.scss'
import { Modal } from './modalRegistry'
import { closeModal, openModal } from './modalSlice'
import close_ic from './assets/close_ic.svg'
import logo from './assets/logo.svg'
import { Button, SubmitButton, TextButton } from '../../atoms/buttons/Buttons'
import { InputField, SelectField } from '../../atoms/fields/Fields'
import { Fragment, useEffect, useState } from 'react'
import { getOTPAsync, loginAsync } from '../../authentication/slice'

export default function ModalRoute() {
    const selectCurrent = useAppSelector(state => state.modal.current)
    if (selectCurrent.length === 0) {
        return <></>
    }
    return (
        Modal.find(modal => modal.name === selectCurrent[selectCurrent.length - 1])!.component
    )
}

function ModalContainer(props: { children: any, onClose: () => any }) {
    return (
        <section
            className={styles.modal_container}>
            <section className={styles.modal}>
                <section className={styles.modal_header}>
                    <button onClick={props.onClose} className={styles.close_button}><img src={close_ic} alt='close button' /></button>
                </section>
                <section className={styles.modal_body}>
                    {props.children}
                </section>
                <section className={styles.modal_footer}>
                    <img src={logo} alt='logo' />
                </section>
            </section>
        </section>
    )
}

export function LoginModal(props: any) {
    const dispatch = useAppDispatch()
    const cred = useAppSelector(state => state.auth.credentials)
    const error = useAppSelector(state => state.auth.error_message)
    const [email, setEmail] = useState(cred ? cred.email! : '')
    const [password, setPassword] = useState(cred ? cred.password! : '')
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        dispatch(getOTPAsync({ email, password }))
    }
    useEffect(() => {
        if (error) setLoading(false)
    }, [error])


    return (
        <ModalContainer onClose={() => dispatch(closeModal('login'))}>
            <div className={styles.flexSB}>
                <h2>Log in</h2>
                <TextButton text='Join Spark Force' className={styles.underline} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputField placeholder='Email' required={true} value={email} onChange={e => setEmail(e.target.value)} />
                <InputField placeholder='Password' required={true} type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <TextButton text='Forgot password?' className={styles.forget_paswd} />
                <SubmitButton loading={loading} className={styles.submit_button} />
            </form>
        </ModalContainer>
    )
}


export function VerifyModal(props: any) {
    const dispatch = useAppDispatch()
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const error = useAppSelector(state => state.auth.error_message)
    useEffect(() => {
        if (error) setLoading(false)
    }, [error])
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        dispatch(loginAsync(otp))
    }
    const handleBack = () => {
        dispatch(closeModal('verify'))
        dispatch(openModal('login'))
    }
    return (
        <ModalContainer onClose={() => dispatch(closeModal('verify'))}>
            <div className={styles.flexSB}>
                <h2>Verify</h2>
                <TextButton text='Back' className={styles.underline} onClick={handleBack} />
            </div>
            <p className={styles.info}>Kindly provide the Four (4) digit code sent to your email</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputField placeholder='OTP' required={true} value={otp} onChange={e => setOtp(e.target.value)} />
                <SubmitButton label='Confirm' loading={loading} className={styles.submit_button} />
            </form>
        </ModalContainer>
    )
}


interface FormProps {
    email: string | undefined,
    password: string | undefined,
    first_name: string | undefined,
    last_name: string | undefined,
    phone: string | undefined,
    gender: string | undefined,
    age: string | undefined,
    country: string | undefined,
    state: string | undefined,
    address: string | undefined,
    nationality: string | undefined,
    channel: string | undefined,
}

const initialForm: FormProps = {
    email: undefined,
    password: undefined,
    first_name: undefined,
    last_name: undefined,
    phone: undefined,
    gender: undefined,
    age: undefined,
    country: undefined,
    state: undefined,
    address: undefined,
    nationality: undefined,
    channel: undefined
}

export function RegisterModal(props: any) {
    const dispatch = useAppDispatch()
    const [index, setIndex] = useState(0)
    const [form, setForm] = useState<FormProps>(initialForm)
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    const steps = [
        {
            label: 'Step 1',
            component: <Step1 form={form} setForm={setForm} setIndex={setIndex} />
        },
        {
            label: 'Step 2',
            component: <Step2 form={form} setForm={setForm} setIndex={setIndex} />
        },
        {
            label: 'Step 3',
            component: <Step2 form={form} setForm={setForm} setIndex={setIndex} />
        },
    ]
    useEffect(() => {

    }, [])

    const handleClassName = (i: number) => {
        if (index === i) {
            return styles.active
        }
        if (index > i) {
            return styles.prev_active
        }
        return undefined
    }

    return (
        <ModalContainer onClose={() => dispatch(closeModal('login'))}>
            <div className={styles.flexSB}>
                <h2>Join Spark Force</h2>
                <TextButton text='Login' className={styles.underline} />
            </div>
            <section className={styles.steps}>
                {steps.map((item, i) => (
                    <TextButton text={item.label} className={handleClassName(i)} onClick={() => setIndex(i)} />
                ))}
            </section>
            <section>
                {steps[index].component}
            </section>
        </ModalContainer>
    )
}

function Step1(props: { form: FormProps, setForm: React.Dispatch<React.SetStateAction<FormProps>>, setIndex: any }) {
    const [email, setEmail] = useState(props.form.email)
    const [password, setPassword] = useState(props.form.password)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string>()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (password === confirmPassword) {
            props.setForm({ ...props.form, email: email, password: password })
            props.setIndex(1)
        }
        else { setError('Password does not match!') }
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='Email' required={true} value={email} onChange={e => setEmail(e.target.value)} />
            <InputField placeholder='Password' required={true} type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <InputField placeholder='Confirm Password' required={true} error={error} type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <SubmitButton label='Next' loading={false} className={styles.submit_button} />
        </form>
    )
}

function Step2(props: { form: FormProps, setForm: React.Dispatch<React.SetStateAction<FormProps>>, setIndex: any }) {
    const [firstName, setFirstName] = useState(props.form.first_name)
    const [lastName, setLastName] = useState(props.form.last_name)
    const [phone, setPhone] = useState(props.form.phone)
    const [gender, setGender] = useState(props.form.gender)
    const [age, setAge] = useState(props.form.age)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.setForm({ ...props.form, first_name: firstName, last_name: lastName, phone: phone })
        props.setIndex(2)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='First Name' required={true} value={firstName} onChange={e => setFirstName(e.target.value)} />
            <InputField placeholder='Last Name' required={true} value={lastName} onChange={e => setLastName(e.target.value)} />
            <InputField placeholder='Phone Number' required={true} value={phone} onChange={e => setPhone(e.target.value)} />
            <SelectField placeholder='Gender' onChange={e => setGender(e.target.value)} option={[['Male', 'M'], ['Female', 'F']]} />
            <SelectField placeholder='Age Range' onChange={e => setGender(e.target.value)} option={[['18 - 25', 'Young'], ['25 - 50', 'Youth'], ['50 - Above', 'Old']]} />
            <div>
                <SubmitButton label='Next' loading={false} className={styles.submit_button} />
                <Button text='Back' type='button' onClick={() => props.setIndex(0)} className={styles.back_button} />
            </div>
        </form>
    )
}