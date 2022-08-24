import ProductContainer from "../product_container/ProductContainer";
import google_ic from './assets/google.png'

export default function LearningContent() {
    const items = [
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 2,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 2,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 2,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 1,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
        {
            id: 2,
            label: 'Latest',
            icon: google_ic,
            title: 'UX Design Certificate',
            text: 'Google at Coursera.org',
            price: 15.00,
            type: 'Remote',
            timePosted: 3,
        },
    ]
    return (
        <ProductContainer
            title="Learning Contents"
            subTitle="Develop your professional skills and get hired by talent seekers from different Sectors all over the world."
            items={items}
            onClickMore={()=>1}
            underline
            currency="$"
        />
    )
}