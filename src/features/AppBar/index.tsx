import { Button, TextButton } from '../../components/Button'
import styles from './AppBar.module.scss'
import Logo from './assets/logo.svg'

export function AppBar(props:any) {
    return (
        <nav className={styles.app_bar}>
            <div className={styles.container}>
                <img src={Logo} alt='logo' className={styles.logo} onClick={() => null} />
                <div className={styles.navs}>
                    <TextButton text='About Us' />
                    <TextButton text='Our Team' />
                    <TextButton text='Testimonials' />
                    <div style={{width: 30}}></div>
                    <Button text='Join Waitlist' onClick={'Coming soon!'} />
                </div>
                <button className={styles.mobile_nav_menu}></button>
            </div>
        </nav>
    )
}