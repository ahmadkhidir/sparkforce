import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextButton } from '../../atoms/buttons/Buttons'
import Logo from '../../atoms/logo/Logo'
import Menu from '../../atoms/menu/Menu'
import SideNav from '../side_nav/SideNav'
import styles from './AppBar.module.scss'
import logo from './assets/logo.svg'

export default function AppBar(props: any) {
	const navigate = useNavigate()
	const [showSideNav, setShowSideNav] = useState(false)
	return (
		<Fragment>
			<SideNav show={showSideNav} setShow={setShowSideNav} />
			<nav className={styles.app_bar}>
				<div className={styles.container}>
					<Logo />
					<div className={styles.navs}>
						<TextButton text='About Us' />
						<TextButton text='Our Team' />
						<TextButton text='Testimonials' />
					</div>
					<div className={styles.auths}>
						<TextButton text='Login' style={{marginRight:20}} />
						<Button text='Join Spark Force' onClick={() => navigate('/waitlist')} />
					</div>
					<Menu className={styles.mobile_nav_menu} onClick={() => setShowSideNav(true)} />
				</div>
			</nav>
		</Fragment>
	)
}