import axios from "axios"
import { Value } from 'react-phone-number-input'

axios.defaults.headers.common['Authorization'] = `Token ${process.env.REACT_APP_AUTH_TOKEN!}`

const local_endpoint = "http://127.0.0.1:8000/v1/waitlist-subscribers/"
const endpoint = "https://sparkforce-backend.herokuapp.com/v1/waitlist-subscribers/"


interface WaitlistSubscriberProps {
    fullname: string,
    country: string,
    phone: Value | undefined,
    location: string | undefined,
    email: string,
    field_of_interest: string
}




async function create_waitlist_subscriber(props: WaitlistSubscriberProps) {
    const response = await axios.post(
        endpoint,
        { ...props },
    )

    return response.status
}



export {
    create_waitlist_subscriber
}