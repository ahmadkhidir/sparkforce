import styles from './SideNav.module.scss'
import close_ic from './assets/close.svg'

interface SideNavProps {
	show?: boolean
	setShow?: React.Dispatch<React.SetStateAction<boolean>>,
	children?: any,
	footer?: any
}

function SideNavContainer({ show, setShow, children, footer }: SideNavProps) {
	let shown = show ? show : false

	return (
		<section className={shown ? styles.side_nav_show : styles.side_nav_hide}>
			<aside className={shown ? styles.nav_show : styles.nav_hide}>
				<div className={styles.nav_header}>
					<h2>Navigation Menu</h2>
					<button onClick={setShow ? () => setShow(false) : undefined}>
						<img src={close_ic} />
					</button>
				</div>
				<div className={styles.nav_content}>
					{children}
				</div>
				<div className={styles.nav_footer}>
					{footer}
				</div>
			</aside>
		</section>
	)
}

export function NavButton(props:{children: any, onClick?: () => any}) {
	return (
		<button className={styles.nav_button} onClick={props.onClick}>
			{props.children}
		</button>
	)
}

export default function SideNav({ show, setShow }: SideNavProps) {
	return (
		<SideNavContainer show={show} setShow={setShow}>
			<NavButton>About US</NavButton>
			<NavButton>Our Team</NavButton>
			<NavButton>Testimonials</NavButton>
			<NavButton>Login</NavButton>
			<NavButton>Join Sparkforce</NavButton>
		</SideNavContainer>
	)
}