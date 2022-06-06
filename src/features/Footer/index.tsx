import { Button } from '../../components/Button'
import styles from './Footer.module.scss'

import logo from './assets/logo.svg'
import facebook from './assets/facebook.svg'
import twitter from './assets/twitter.svg'
import linkedin from './assets/linkedin.svg'
import floatingButton from './assets/floatingButton.svg'
import { scrollRef } from '../../app/helper'
import { useNavigate } from 'react-router-dom'

export function Footer(props: any) {
    const navigate = useNavigate()
    return (
        <footer className={styles.footer}>
            <div className={styles.head}>
                <h1>Get unlimited opportunities to boost your career</h1>
                <Button text='Join Waitlist' onClick={() => navigate('/waitlist')} />
                <hr />
                <img src={logo} alt='logo' />
                <p>Explore the world of unlimited opportunities to boost your career</p>
                <div aria-label='social links' className={styles.socials}>
                    {/* <img src={twitter} alt='twitter' /> */}
                    {/* <img src={facebook} alt='facebook' /> */}
                    <a href='https://www.linkedin.com/company/joinsparkforce/' target="_blank" rel='noreferrer'><img src={linkedin} alt='linkedin' />LinkedIn</a>
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