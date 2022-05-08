import styles from './Button.module.scss'
import { handleClick } from './helpers'
import { ButtonProps } from './utils'

export function Button(props: ButtonProps) {
    return (
        <button className={styles.button}
            onClick={() => handleClick(props.onClick)}
        >{props.text}
        </button>
    )
}

export function TextButton(props: ButtonProps) {
    return (
        <button className={styles.text__button}
            onClick={() => handleClick(props.onClick)}
        >{props.text}
        </button>
    )
}

export function ArrowButton(props: ButtonProps) {
    return (
        <button className={styles.arrow__button}
            onClick={() => handleClick(props.onClick)}
        >{props.text}<svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7929 0.292893C13.1834 -0.097631 13.8166 -0.097631 14.2071 0.292893L18.2065 4.29231L18.2071 4.29289C18.303 4.38877 18.3753 4.49927 18.4241 4.61722C18.473 4.73512 18.5 4.86441 18.5 5C18.5 5.13505 18.4732 5.26385 18.4247 5.38138C18.4006 5.43977 18.3708 5.49634 18.3352 5.55023C18.2986 5.60568 18.2559 5.65829 18.2071 5.70711L18.2065 5.70769L14.2071 9.70711C13.8166 10.0976 13.1834 10.0976 12.7929 9.70711C12.4024 9.31658 12.4024 8.68342 12.7929 8.29289L15.0858 6H1.5C0.947715 6 0.5 5.55228 0.5 5C0.5 4.44772 0.947715 4 1.5 4H15.0858L12.7929 1.70711C12.4024 1.31658 12.4024 0.683417 12.7929 0.292893Z" fill="black" />
            </svg>
        </button>
    )
}