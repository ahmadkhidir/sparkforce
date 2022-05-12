import { Button } from '../../components/Button'
import styles from './Footer.module.scss'

import logo from './assets/logo.svg'
import facebook from './assets/facebook.svg'
import twitter from './assets/twitter.svg'
import linkedin from './assets/linkedin.svg'
import floatingButton from './assets/floatingButton.svg'
import { scrollRef } from '../../app/helper'

export function Footer(props: any) {
    return (
        <footer className={styles.footer}>
            <div className={styles.head}>
                <h1>Get unlimited opportunities to boost your career</h1>
                <Button text='Join Waitlist' />
                <hr />
                <img src={logo} alt='logo' />
                <p>Explore the world of unlimited opportunities to boost your career</p>
                <div className={styles.socials}>
                    <img src={twitter} alt='twitter' />
                    <img src={facebook} alt='facebook' />
                    <img src={linkedin} alt='linkedin' />
                </div>
            </div>
            <div className={styles.navs}>
                <img src={floatingButton} onClick={() => scrollRef.current!.scrollTo({top: 0, behavior: 'smooth'})} alt='scroll top' />
            </div>
            <div className={styles.foot}>
                <div className={styles.container}>
                    <p>All right reserved</p>
                    <p>Sparkforce 2022</p>
                </div>

            </div>
        </footer>
    )
}