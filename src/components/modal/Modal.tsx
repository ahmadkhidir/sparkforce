import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './Modal.module.scss'
import { Modal } from './modalRegistry'
import { closeModal, closeSucessModal, openModal, openSucessModal } from './modalSlice'
import close_ic from './assets/close_ic.svg'
import logo from './assets/logo.svg'
import success from './assets/checkbox.svg'
import { Button, SubmitButton, TextButton } from '../../atoms/buttons/Buttons'
import { CheckBoxField, InputField, SelectField } from '../../atoms/fields/Fields'
import { Fragment, useEffect, useState } from 'react'
import { getOTPAsync, loginAsync } from '../../authentication/slice'
import { register } from '../../authentication/api'

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
    const handleRegisterButton = () => {
        dispatch(closeModal('login'))
        dispatch(openModal('register'))
    }


    return (
        <ModalContainer onClose={() => dispatch(closeModal('login'))}>
            <div className={styles.flexSB}>
                <h2>Log in</h2>
                <TextButton text='Join Spark Force' className={styles.underline} onClick={handleRegisterButton} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputField placeholder='Email' required={true} value={email} onChange={e => setEmail(e.target.value)} error={error} />
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
                <InputField placeholder='OTP' required={true} value={otp} onChange={e => setOtp(e.target.value)} error={error} />
                <SubmitButton label='Confirm' loading={loading} className={styles.submit_button} />
            </form>
        </ModalContainer>
    )
}


interface FormProps {
    user: {
        email: string | undefined,
        password: string | undefined,
        first_name: string | undefined,
        last_name: string | undefined,
    },
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
    user: {
        email: undefined,
        password: undefined,
        first_name: undefined,
        last_name: undefined,
    },
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
    const submitForm = async (e: any) => {
        try {
            console.log(form)
            const res = await register(form)
            dispatch(openSucessModal('Your account has been created successfully. Kindly login with your credentials'))
            return true
        } catch (error) {
            console.log(error)
            alert('error')
            return false
        }
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
            component: <Step3 form={form} setForm={setForm} setIndex={setIndex} submitForm={submitForm} />
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

    const handleLoginButton = () => {
        dispatch(closeModal('register'))
        dispatch(openModal('login'))
    }

    return (
        <ModalContainer onClose={() => dispatch(closeModal('register'))}>
            <div className={styles.flexSB}>
                <h2>Join Spark Force</h2>
                <TextButton text='Login' className={styles.underline} onClick={handleLoginButton} />
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
    const [email, setEmail] = useState<string|undefined>(props.form.user.email)
    const [password, setPassword] = useState(props.form.user.password)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string>()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (password === confirmPassword) {
            props.setForm({ ...props.form, user: {...props.form.user, email: email, password: password} })
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
    const [firstName, setFirstName] = useState(props.form.user.first_name)
    const [lastName, setLastName] = useState(props.form.user.last_name)
    const [phone, setPhone] = useState(props.form.phone)
    const [gender, setGender] = useState(props.form.gender)
    const [age, setAge] = useState(props.form.age)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.setForm({ ...props.form, phone: phone, gender: gender, age: age, user: {...props.form.user, first_name: firstName, last_name: lastName,}})
        props.setIndex(2)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='First Name' required={true} value={firstName} onChange={e => setFirstName(e.target.value)} />
            <InputField placeholder='Last Name' required={true} value={lastName} onChange={e => setLastName(e.target.value)} />
            <InputField placeholder='Phone Number' required={true} value={phone} onChange={e => setPhone(e.target.value)} />
            <SelectField placeholder='Gender' onChange={e => setGender(e.target.value)} option={[['Male', 'M'], ['Female', 'F']]} />
            <SelectField placeholder='Age Range' onChange={e => setAge(e.target.value)} option={[['18 - 25', 'Young'], ['25 - 50', 'Youth'], ['50 - Above', 'Old']]} />
            <div>
                <SubmitButton label='Next' loading={false} className={styles.submit_button} />
                <Button text='Back' type='button' onClick={() => props.setIndex(0)} className={styles.back_button} />
            </div>
        </form>
    )
}


function Step3(props: { form: FormProps, setForm: React.Dispatch<React.SetStateAction<FormProps>>, setIndex: any, submitForm:any }) {
    const [country, setCountry] = useState(props.form.country)
    const [state, setState] = useState(props.form.state)
    const [address, setAddress] = useState(props.form.address)
    const [nationality, setNationality] = useState(props.form.nationality)
    const [channel, setChannel] = useState(props.form.channel)
    const [cheked, setCheked] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        props.setForm({ ...props.form, country: country, state: state, address: address, nationality: nationality, channel: channel })
        setLoading(true)
        const res = await props.submitForm()
        setLoading(res)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='Country' required={true} value={country} onChange={e => setCountry(e.target.value)} />
            <InputField placeholder='State' required={true} value={state} onChange={e => setState(e.target.value)} />
            <InputField placeholder='Address' required={true} value={address} onChange={e => setAddress(e.target.value)} />
            <InputField placeholder='Nationality' required={true} value={nationality} onChange={e => setNationality(e.target.value)} />
            <InputField placeholder='How Did You Hear About Spark Force?' required={true} value={channel} onChange={e => setChannel(e.target.value)} />
            <CheckBoxField label='I agree to the SPARKFORCE terms an conditions' checked={cheked} onChange={(e)=> setCheked(e.target.checked)} />
            <div>
                <SubmitButton label='Submit' loading={loading ? loading : !cheked} className={styles.submit_button} />
                <Button text='Back' type='button' onClick={() => props.setIndex(1)} className={styles.back_button} />
            </div>
        </form>
    )
}


export function SuccessModal(props: any) {
    const dispatch = useAppDispatch()
    const message = useAppSelector(state => state.modal.message)
    const handleBack = () => {
        dispatch(closeSucessModal())
        dispatch(openModal('login'))
    }
    return (
        <ModalContainer onClose={() => dispatch(closeSucessModal())}>
            <div className={styles.flexSB}>
                <h2>Done</h2>
                <TextButton text='Login' className={styles.underline} onClick={handleBack} />
            </div>
            <p className={styles.info}>{message}</p>
            <img src={success} className={styles.success} />
        </ModalContainer>
    )
}