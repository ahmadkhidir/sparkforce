import { VideoCarousel } from '../../components/Carousel'
import styles from './Testimonials.module.scss'
const intro = require("./assets/Intro.mp4")

export default function Testimonials(props: any) {
    return (
        <section className={styles.testimonials}>
            <h1>Testimonials</h1>
            <div className={styles.container}>
                <VideoCarousel
                    items={[
                        [
                            intro,
                            'Princewill Uzo',
                            "Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I really appreciate"
                        ],
                        [
                            intro,
                            'Ahmad Khidir',
                            "Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I really appreciate"
                        ],
                    ]}
                />
            </div>

        </section>
    )
}