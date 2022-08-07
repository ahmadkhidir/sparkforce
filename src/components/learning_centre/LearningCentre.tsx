import { ArrowButton } from '../../atoms/Button'
import { ImageContentRowCard } from '../../atoms/Card'
import styles from './LearningCentre.module.scss'
import Image1 from './assets/image1.png'
import Image2 from './assets/image2.png'
import Image3 from './assets/image3.png'
import Image4 from './assets/image4.png'
import Image5 from './assets/image5.png'
import Image6 from './assets/image6.png'

export default function LearningCentre(props: any) {
    return (
        <section className={styles.learning_centre}>
            <div className={styles.container}>
                <h1>Learning Centre</h1>
                <p>Develop your professional skills and get hired by talent seekers from different Sectors all over the world.</p>
                <ArrowButton text='Explore Learning Contents' />

                <div className={styles.grid}>
                    <ImageContentRowCard
                        image={Image1}
                        title='Medical Assistance'
                        detail='Develop your skills in medical assistant'
                    />
                    <ImageContentRowCard
                        image={Image2}
                        title='Nursing Assistant'
                        detail='Develop your skills in nursing assistant'
                    />
                    <ImageContentRowCard
                        image={Image3}
                        title='Physician'
                        detail='Develop your skills in medical line'
                    />
                    <ImageContentRowCard
                        image={Image4}
                        title='Therapist'
                        detail='Develop your skills in therapy'
                    />
                    <ImageContentRowCard
                        image={Image5}
                        title='Pharmacy Technician'
                        detail='Develop your skills in pharmacy technician'
                    />
                    <ImageContentRowCard
                        image={Image6}
                        title='Diagnostic Sonographer'
                        detail='Develop your skills in product management'
                    />
                </div>
            </div>
        </section>
    )
}