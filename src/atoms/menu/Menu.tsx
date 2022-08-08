import image from './assets/menu.svg'
import styles from './Menu.module.scss'
import classNames from 'classnames'

const c = classNames

export default function Menu(props: {className?: string, onClick?: () => any}) {
    return (
        <button 
            className={c(styles.menu, props.className)} 
            onClick={props.onClick}>
            <img src={image} alt="menu" />
        </button>
    )
}