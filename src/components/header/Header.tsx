import { createRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/buttons/Buttons'
import { InputField, SearchField } from '../../atoms/fields/Fields'
import { VideoPlayer } from '../../atoms/videos/Videos'
import styles from './Header.module.scss'

const intro = require('./assets/Intro.mp4')

export default function Header(props: any) {
	const navigate = useNavigate()
	return (
		<header className={styles.header}>
			<VideoPlayer src={intro} className={styles.video} autoplay={true} />
			<section className={styles.caption}>
				<div className={styles.container}>
					<p>Explore the world of unlimited opportunities to boost your career</p>
					<Button text='Get Started' onClick={() => navigate('/waitlist')} />
				</div>
			</section>
		</header>
	)
}


export function HeaderAfterLogin(props: any) {
	const [search, setSearch] = useState('')
	const handleSubmit = (e:any) => {
		e.preventDefault()
	}
	return (
		<header className={styles.header_after_login}>
			<section>
				<p>Explore the world of Opportunities</p>
				<h1>Get unlimited opportunities to boost your career</h1>
				<form onSubmit={handleSubmit}>
					<SearchField value={search} onChange={e => setSearch(e.target.value)} onClear={() => setSearch('')} placeholder='Type what you want here E.g: User Experience Design' />
				</form>
			</section>
		</header>
	)
}