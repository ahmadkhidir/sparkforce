import { ArrowButton } from '../../atoms/buttons/Buttons'
import { ImageContentCard } from '../../atoms/cards/Cards'
import styles from './Intro.module.scss'
import Image1 from './assets/image1.png'
import Image2 from './assets/image2.png'
import Image3 from './assets/image3.png'
import Image4 from './assets/image4.png'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { openModal } from '../modal/modalSlice'

export default function Intro(props: any) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return (
        <section className={styles.intro}>
            <div className={styles.container}>
                <h1>Spark Force</h1>
                <p>Create online presence, showcase your portfolio, access opportunities and learning materials for career optimization.</p>
                <ArrowButton text='Join Sparkforce' onClick={() => dispatch(openModal('register'))} />

                <div className={styles.grid}>
                    <ImageContentCard
                        image={Image1}
                        title='Create Your Professional Online Presence'
                        detail='Build your professional profile, and find projects and new job opportunities.'
                    />
                    <ImageContentCard
                        image={Image2}
                        title='Showcase Your Skills By Posting Your Works'
                        detail='Showcase your creativity, experience, and skills by publishing completed or ongoing projects.'
                    />
                    <ImageContentCard
                        image={Image3}
                        title='Apply for Your Opportunity of Interest'
                        detail='Explore and apply for opportunities that match your interests, skills, and experience.'
                    />
                    <ImageContentCard
                        image={Image4}
                        title='Access Learning Content for Career Optimization'
                        detail='Explore relevant learning contents to grow your skills in your area of interest.'
                    />
                </div>
            </div>
        </section>
    )
}