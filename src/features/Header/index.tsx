import { createRef, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Video } from '../../components/Video'
import styles from './Header.module.scss'

const intro = require('./assets/Intro.mp4')

export function Header(props: any) {
    return (
        <header className={styles.header}>
            <Video src={intro} className={styles.video} autoplay={true} />
            <section className={styles.caption}>
                <div className={styles.container}>
                    <p>Explore the world of unlimited opportunities to boost your career</p>
                    <Button text='Join Waitlist' />
                </div>
            </section>
        </header>
    )
}