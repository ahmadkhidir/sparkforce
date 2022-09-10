import menu from './assets/menu.svg'
import search from './assets/search.svg'
import styles from './Icons.module.scss'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

const c = classNames

export default function Menu(props: {className?: string, onClick?: () => any}) {
    return (
        <button 
            className={c(styles.menu, props.className)} 
            onClick={props.onClick}>
            <img src={menu} alt="menu" draggable={false} />
        </button>
    )
}

export function Search(props: {className?: string, onClick?: () => any}) {
    const navigate = useNavigate()
    return (
        <button 
            className={c(styles.menu, props.className)} 
            onClick={() => navigate('/search/')}>
            <img src={search} alt="search" draggable={false} />
        </button>
    )
}