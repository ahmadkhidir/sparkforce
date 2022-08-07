import styles from './Modals.module.scss'
import Close from './assets/close.svg';
import Success from './assets/success.svg';
import Error from './assets/error.svg';
import Logo from './assets/logo.svg';


interface ModalProps {
    onClick: React.MouseEventHandler<HTMLImageElement> | undefined,
    title: string,
    body: string,
}

export function SuccessModal(props: ModalProps) {
    return (
        <div className={styles.modal}>
            <img src={Close}
                className={styles.close_button}
                alt='close button'
                onClick={props.onClick}
            />
            <img src={Success} className={styles.icon} alt='success icon' />
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <img src={Logo} className={styles.logo} alt='logo' />
        </div>
    )
}

export function ErrorModal(props: ModalProps) {
    return (
        <div className={styles.modal}>
            <img src={Close}
                className={styles.close_button}
                alt='close button'
                onClick={props.onClick}
            />
            <img src={Error} className={styles.icon} alt='error icon' />
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <img src={Logo} className={styles.logo} alt='logo' />
        </div>
    )
}

export function ConflictModal(props: ModalProps) {
    return (
        <div className={styles.modal}>
            <img src={Close}
                className={styles.close_button}
                alt='close button'
                onClick={props.onClick}
            />
            <img src={Error} className={styles.icon} alt='conflict icon' />
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <img src={Logo} className={styles.logo} alt='logo' />
        </div>
    )
}