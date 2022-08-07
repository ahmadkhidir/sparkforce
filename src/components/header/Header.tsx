import { createRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/buttons/Buttons'
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
                    <Button text='Join Waitlist' onClick={() => navigate('/waitlist')} />
                </div>
            </section>
        </header>
    )
}