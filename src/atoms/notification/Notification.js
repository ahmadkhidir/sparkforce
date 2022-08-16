import styles from './Notification.module.scss'
import bell_ic from './assets/bell.svg'

export default function Notification({value}) {
    const parsedValue = value > 9 ? '9+' : `${value}`
    return (
        <div className={styles.notification}>
            <div className={styles.value}>{parsedValue}</div>
            <img src={bell_ic} />
        </div>
    )
}