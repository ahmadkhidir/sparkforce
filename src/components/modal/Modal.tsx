import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './Modal.module.scss'
import { Modal } from './modalRegistry'
import { closeModal, closeSucessModal, openModal, openSucessModal } from './modalSlice'
import close_ic from './assets/close_ic.svg'
import logo from './assets/logo.svg'
import success from './assets/checkbox.svg'
import error from './assets/error.svg'
import { Button, SubmitButton, TextButton } from '../../atoms/buttons/Buttons'
import { CheckBoxField, InputField, SelectField } from '../../atoms/fields/Fields'
import { createContext, Fragment, useContext, useEffect, useReducer, useState } from 'react'
import { getOTPAsync, loginAsync, registerAsync, regStep1, regStep2, regStep3, updateRegLoading } from '../../authentication/slice'
import { checkUserConflict, register } from '../../authentication/api'
import { type } from '@testing-library/user-event/dist/types/setup/directApi'

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


export function RegisterModal(props: any) {
    const dispatch = useAppDispatch()
    const [index, setIndex] = useState(0)
    const steps = [
        {
            label: 'Step 1',
            component: <Step1 setIndex={setIndex} />
        },
        {
            label: 'Step 2',
            component: <Step2 setIndex={setIndex} />
        },
        {
            label: 'Step 3',
            component: <Step3 setIndex={setIndex} />
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

function Step1({setIndex}:any) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.registrationUser)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string>()
    const [emailError, setEmailError] = useState<string>()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (password === confirmPassword) {
            try {
                const res = await checkUserConflict(email!)
                if (res.data.detail) { setEmailError('There is a user with the same Email, please Log In') }
                else {
                    // props.setForm({ ...props.form, user: { ...props.form.user, email: email, password: password } })
                    dispatch(regStep1({email: email, password: password}))
                    setIndex(1)
                }
            } catch (error) {
                setEmailError('Error while validating your Email, please try again.')
            }
        }
        else { setError('Password does not match!') }
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='Email' required={true} error={emailError} value={email} onChange={e => setEmail(e.target.value)} />
            <InputField placeholder='Password' required={true} type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <InputField placeholder='Confirm Password' required={true} error={error} type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <SubmitButton label='Next' loading={false} className={styles.submit_button} />
        </form>
    )
}

function Step2({setIndex}:any) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.registrationUser)
    const details = useAppSelector(state => state.auth.registrationDetails)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [phone, setPhone] = useState(details.phone)
    const [gender, setGender] = useState(details.gender)
    const [age, setAge] = useState(details.age)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // props.setForm({ ...props.form, phone: phone, gender: gender, age: age, user: { ...props.form.user, first_name: firstName, last_name: lastName, } })
        dispatch(regStep2({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            gender: gender,
            age: age,
        }))
        setIndex(2)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='First Name' required={true} value={firstName} onChange={e => setFirstName(e.target.value)} />
            <InputField placeholder='Last Name' required={true} value={lastName} onChange={e => setLastName(e.target.value)} />
            <InputField placeholder='Phone Number' required={false} value={phone} onChange={e => setPhone(e.target.value)} />
            <SelectField placeholder='Gender' onChange={e => setGender(e.target.value)} option={[['Male', 'M'], ['Female', 'F']]} />
            <SelectField placeholder='Age Range' onChange={e => setAge(e.target.value)} option={[['18 - 25', 'Young'], ['25 - 50', 'Youth'], ['50 - Above', 'Old']]} />
            <div>
                <SubmitButton label='Next' loading={false} className={styles.submit_button} />
                <Button text='Back' type='button' onClick={() => setIndex(0)} className={styles.back_button} />
            </div>
        </form>
    )
}


function Step3({setIndex}:any) {
    const dispatch = useAppDispatch()
    const details = useAppSelector(state => state.auth.registrationDetails)
    const loading = useAppSelector(state => state.auth.regLoading)
    const [country, setCountry] = useState(details.country)
    const [countryState, setCountryState] = useState(details.country_state)
    const [address, setAddress] = useState(details.address)
    const [nationality, setNationality] = useState(details.nationality)
    const [channel, setChannel] = useState(details.channel)
    const [cheked, setCheked] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(regStep3({
            country: country,
            countryState: countryState,
            address: address,
            nationality: nationality,
            channel: channel
        }))
        dispatch(registerAsync())
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField placeholder='Country' required={true} value={country} onChange={e => setCountry(e.target.value)} />
            <InputField placeholder='State' required={true} value={countryState} onChange={e => setCountryState(e.target.value)} />
            <InputField placeholder='Address' required={false} value={address} onChange={e => setAddress(e.target.value)} />
            <InputField placeholder='Nationality' required={true} value={nationality} onChange={e => setNationality(e.target.value)} />
            <InputField placeholder='How Did You Hear About Spark Force?' required={false} value={channel} onChange={e => setChannel(e.target.value)} />
            <CheckBoxField label='I agree to the SPARKFORCE terms an conditions' checked={cheked} onChange={(e) => setCheked(e.target.checked)} />
            <div>
                <SubmitButton label='Submit' loading={loading ? loading : !cheked} className={styles.submit_button} />
                <Button text='Back' type='button' onClick={() => setIndex(1)} className={styles.back_button} />
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

export function ErrorModal(props: any) {
    const dispatch = useAppDispatch()
    const message = useAppSelector(state => state.modal.message)
    return (
        <ModalContainer onClose={() => dispatch(closeSucessModal())}>
            <div className={styles.flexSB}>
                <h2>Error</h2>
            </div>
            {/* <p className={styles.info}>{message}</p> */}
            <p className={styles.info}>Sorry! Your account registration was not successful. Kindly try to register again.</p>
            <img src={error} className={styles.success} />
        </ModalContainer>
    )
}