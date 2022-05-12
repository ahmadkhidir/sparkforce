import { useNavigate } from 'react-router-dom'
import { Button, TextButton } from '../../components/Button'
import styles from './AppBar.module.scss'
import Logo from './assets/logo.svg'

export function AppBar(props:any) {
    const navigate = useNavigate()
    return (
        <nav className={styles.app_bar}>
            <div className={styles.container}>
                <img src={Logo} alt='logo' className={styles.logo} onClick={() => navigate('/')} />
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