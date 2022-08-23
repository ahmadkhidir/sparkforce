import styles from './Avatar.module.scss'
import bell_ic from './assets/bell.svg'
import classNames from 'classnames'

const c = classNames


export default function Avatar({size, image, className=null}) {
    return (
        <section className={c(styles.avatar, className)} style={{width: size, height: size}}>
            <img src={image} alt='avatar' />
        </section>
    )
}