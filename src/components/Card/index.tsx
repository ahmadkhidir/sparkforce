import styles from './Card.module.scss'
import { IconContentCardProps, ImageContentCardProps } from './utils'

export function ImageContentCard(props: ImageContentCardProps) {
    return (
        <div className={styles.image_content__card}>
            <div className={styles.header}><img src={props.image} alt='header' /></div>
            <div className={styles.body}>
                <h1>{props.title}</h1>
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export function ImageContentRowCard(props: ImageContentCardProps) {
    return (
        <div className={styles.image_content_row__card}>
            <div className={styles.header}><img src={props.image} alt='header' /></div>
            <div className={styles.body}>
                <h1>{props.title}</h1>
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export function IconContentCard(props: IconContentCardProps) {
    return (
        <div className={styles.icon_content__card}>
            <img src={props.icon} alt='icon' />
            <h1>{props.title}</h1>
            <p>{props.detail}</p>
        </div>
    )
}