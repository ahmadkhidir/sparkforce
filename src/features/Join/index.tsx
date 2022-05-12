import { IconContentCard } from '../../components/Card'
import styles from './Join.module.scss'

import image1 from "./assets/image1.svg"
import image2 from "./assets/image2.svg"
import image3 from "./assets/image3.svg"
import image4 from "./assets/image4.svg"
import image5 from "./assets/image5.svg"
import image6 from "./assets/image6.svg"
import image7 from "./assets/image7.svg"
import image8 from "./assets/image8.svg"

export function Join(props: any) {
    return (
        <section className={styles.join}>
            <div className={styles.container}>
                <h1>Why Join Spark Force ?</h1>
                <div className={styles.grid}>
                    <IconContentCard
                        icon={image1}
                        title='Online Presence'
                        detail='Connect to opportunities through your professional online presence. '
                    />

                    <IconContentCard
                        icon={image2}
                        title='Unlimited Opportunities'
                        detail='Explore unlimited number of opportunities absolutely for free.'
                    />

                    <IconContentCard
                        icon={image3}
                        title='Creativity Showcase'
                        detail='Showcase your previousely done work and reviews for more opportunites.'
                    />

                    <IconContentCard
                        icon={image4}
                        title='Career Growth'
                        detail='Explore learning contents from different sources to upgrade your skills'
                    />

                    <IconContentCard
                        icon={image5}
                        title='Smart Matching'
                        detail='Browse the opportunity of interest for perfect match'
                    />

                    <IconContentCard
                        icon={image6}
                        title='All Forms of Opportunities'
                        detail='From full-time and part-time jobs, to contract, internship, freelance, and volunteering.'
                    />

                    <IconContentCard
                        icon={image7}
                        title='Remote and On-site'
                        detail='From remote in any location to specific regions, countries, and on-site opportunites.'
                    />

                    <IconContentCard
                        icon={image8}
                        title='Integrated Payments'
                        detail='Flexible and dynamic reward solution for motivation and incentives.'
                    />
                </div>
            </div>
        </section>
    )
}