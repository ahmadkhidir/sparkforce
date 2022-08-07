import { Carousel } from '../../atoms/carousels/Carousels'
import styles from './OurTeam.module.scss'

export default function OurTeam(props: any) {
    return (
        <section className={styles.our_team}>
            <h1>Our Team</h1>
            <Carousel
                items={[
                    [
                        require('./assets/image1.jpg'),
                        'Dr. Lawal Bakare',
                        'Founder, Service Design Lead'
                    ],
                    [
                        require('./assets/image2.jpg'),
                        'Gbubemi Atimomo',
                        'HR Lead'
                    ],
                    [
                        require('./assets/image3.jpg'),
                        'Folake Lawal',
                        'Training Systems Lead'
                    ]
                ]}
            />
        </section>
    )
}