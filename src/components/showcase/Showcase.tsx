import { ArrowButton } from '../../atoms/Button'
import styles from './Showcase.module.scss'
import image1 from './assets/image1.png'
import { List } from '../../atoms/List'
import { useNavigate } from 'react-router-dom'

export default function Showcase(props: any) {
    const navigate = useNavigate()
    return (
        <section className={styles.showcase}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Showcase Your Skills to Access Opportunities</h1>
                    <ArrowButton text='Join Waitlist' onClick={() => navigate('/waitlist')} />
                    <List
                        items={[
                            [
                                'Showcase Your Skills',
                                'You are far more than just your CV! Upload your previosly done works to let the world see who you are.'
                            ],
                            [
                                'Job Opportunity',
                                'Explore relevant job opportunities from all over the world and secure your dream employment.'
                            ],
                            [
                                'Volunteering',
                                'Browse and join volunteer projects to make a difference, and build new skills and work experience.'
                            ]
                        ]}
                    />
                </div>
                <div className={styles.image}>
                    <img src={image1} alt='' />
                </div>
            </div>
        </section>
    )
}