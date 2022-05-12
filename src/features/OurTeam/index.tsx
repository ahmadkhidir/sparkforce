import { Carousel } from '../../components/Carousel'
import styles from './OurTeam.module.scss'

export function OurTeam(props: any) {
    return (
        <section className={styles.our_team}>
            <h1>Our Team</h1>
            <Carousel
                items={[
                    [
                        require('./assets/image1.png'),
                        'Dr. Lawal Bakare',
                        'CEO / Creative Director'
                    ],
                    [
                        require('./assets/image2.png'),
                        'Dr. Ahmad Khidir',
                        'Junior Developer'
                    ],
                    [
                        require('./assets/image3.png'),
                        'Maryam Khidir',
                        'Senior Developer'
                    ],
                    [
                        require('./assets/image1.png'),
                        'Mr Olawale',
                        'UI / UX Designer'
                    ],
                    [
                        require('./assets/image2.png'),
                        'Princewill Uzo',
                        'Backend Developer'
                    ],
                ]}
            />
        </section>
    )
}