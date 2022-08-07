import { Dialog } from '@material-ui/core'
import { useState } from 'react'
import { Value } from 'react-phone-number-input'
import { create_waitlist_subscriber } from '../../clients/waitlist'
import { SubmitButton } from '../../components/Button'
import { InputField, PhoneField, SelectField } from '../../components/Fields'
import { ListView } from '../../components/List'
import { SuccessModal, ErrorModal, ConflictModal } from '../../components/Modal'
import AppBar from '../../features/app_bar/AppBar'
import Footer from '../../features/footer/Footer'
import styles from './WaitList.module.scss'

export default function WaitList(props: any) {
    const [fullname, setFullname] = useState('')
    const [country, setCountry] = useState('')
    const [phone, setPhone] = useState<Value>()
    const [location, setLocation] = useState<string | undefined>('')
    const [email, setEmail] = useState('')
    const [FOI, setFOI] = useState('')

    const [openModal, setOpenModal] = useState(false)
    const [responseStatus, setResponseStatus] = useState<number | undefined>()

    const [inProccess, setInProccess] = useState(false)


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setInProccess(true)

        const res = await create_waitlist_subscriber({
            country: country,
            email: email,
            fullname: fullname,
            location: location,
            phone: phone,
            field_of_interest: FOI
        })

        // alert success message if successful request
        setOpenModal(true)
        setResponseStatus(res.status)
        // clear fields
        // setFullname('');
        // setCountry('');
        // setLocation(undefined)
        // setEmail('')
        // setFOI('')
        setInProccess(false)
    }

    const handleDialog = () => {
        switch (responseStatus) {
            case 201:
                return <SuccessModal 
                title= "Thank You!"
                body= "You have successfully joined our waitlist"
                onClick={() => setOpenModal(false)} 
                />
            case 409:
                return <ConflictModal
                title= "Hey!"
                body= "Oops! user already exist in our waitlist database"
                onClick={() => setOpenModal(false)} 
                />
            default:
                return <ErrorModal 
                title= "Error!"
                body= {`Oh! sorry, kindly try again later(E${responseStatus})`}
                onClick={() => setOpenModal(false)} 
                />
        }
    }


    return (
        <ListView appBar={<AppBar />}>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth={'xs'}>
                {handleDialog()}
            </Dialog>
            <main className={styles.wait_list}>
                <h1>Join Waitlist</h1>
                <form onSubmit={handleSubmit}>
                    <InputField required
                        value={fullname}
                        label='Name (Required)'
                        placeholder='Fullname'
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <SelectField required
                        value={country}
                        label='Country (Required)'
                        options={[
                            'United State',
                            'Nigeria'
                        ]}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <PhoneField required
                        value={phone}
                        label='Phone (Optional)'
                        placeholder='New york city'
                        onChange={(e) => setPhone(e!)}
                    />
                    <InputField required={false}
                        value={location}
                        label='Location (Optional)'
                        placeholder='New york city'
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <InputField required
                        value={email}
                        label='Email Address (Required)'
                        placeholder='example@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField required
                        value={FOI}
                        label='Field of Interest (Required)'
                        placeholder='Pharmacy Technician'
                        onChange={(e) => setFOI(e.target.value)}
                    />
                    <p>By proceeding you agree to our</p>
                    <p>Privacy Policy</p>

                    <SubmitButton className={styles.submit_button} loading={inProccess} />
                </form>
            </main>
            <Footer />
        </ListView>
    )
}