import ProductContainer from "../product_container/ProductContainer";
import google_ic from './assets/google.png'

export default function VolunteerOpportunities() {
    const items = [
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: 200,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: 200,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: 200,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: null,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: 200,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Designer (Internship)',
            text: 'Washington DC, United States.',
            price: null,
            type: 'Remote',
            timePosted: 3,
        },
    ]
    return (
        <ProductContainer
            title="Volunteer Opportunites"
            subTitle="Browse and join volunteer projects to make a difference, and build new skills and work experience."
            items={items}
            onClickMore={()=>1}
            currency={'P'}
        />
    )
}