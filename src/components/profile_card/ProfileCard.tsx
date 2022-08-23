import Avatar from "../../atoms/avatar/Avatar";
import styles from './ProfileCard.module.scss'
import img_ic from './assets/avatar.jpeg'
import arrow_ic from './assets/arrow.svg'

export function ProfileCard(props: any) {
    return (
        <section className={styles.profile_card}>
            <Avatar image={img_ic} size={65} />
            <div className={styles.content}>
                <h2>Mao Chin John</h2>
                <p>Public Health Data Scientist</p>
            </div>
            <button className={styles.btn}>
                <img src={arrow_ic} alt={'arrow'} />
            </button>
        </section>
    )
}