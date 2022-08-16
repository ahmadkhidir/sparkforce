import styles from './Avatar.module.scss'
import bell_ic from './assets/bell.svg'

export default function Avatar({size, image}) {
    return (
        <div className={styles.avatar} style={{width: size, height: size}}>
            <img src={image} />
        </div>
    )
}