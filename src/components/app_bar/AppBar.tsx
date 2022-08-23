import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import Avatar from '../../atoms/avatar/Avatar'
import { Button, TextButton } from '../../atoms/buttons/Buttons'
import Logo from '../../atoms/logo/Logo'
import Menu from '../../atoms/menu/Menu'
import Notification from '../../atoms/notification/Notification'
import { openModal } from '../modal/modalSlice'
import SideNav from '../side_nav/SideNav'
import styles from './AppBar.module.scss'
import avatar_ic from './assets/avatar.jpeg'

export default function AppBar(props: any) {
	const dispatch = useAppDispatch()
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
						<TextButton text='Login' onClick={()=>dispatch(openModal('login'))} />
						<Button text='Join Spark Force' onClick={()=>dispatch(openModal('register'))} />
					</div>
					<Menu className={styles.mobile_nav_menu} onClick={() => setShowSideNav(true)} />
				</div>
			</nav>
		</Fragment>
	)
}


export function AppBarAfterLogin(props: any) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [showSideNav, setShowSideNav] = useState(false)
	return (
		<Fragment>
			<SideNav show={showSideNav} setShow={setShowSideNav} />
			<nav className={styles.app_bar}>
				<div className={styles.max_container}>
					<Menu className={styles.nav_menu} onClick={() => setShowSideNav(true)} />
					<Logo />
					<div className={styles.auths}>
						<Notification value={10} />
						<Avatar size={40} image={avatar_ic} />
					</div>
				</div>
			</nav>
		</Fragment>
	)
}