import { createRef, useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import styles from './Header.module.scss'
const intro = require("./assets/Intro.mp4")

export function Header(props: any) {
    const [isPlay, setIsPlay] = useState(true)
    const [isMute, setIsMute] = useState(true)
    const [isShow, setIsShow] = useState(true)
    const _video = createRef<HTMLVideoElement>()
    useEffect(() => {
        if (isPlay) {
            _video.current?.play()
        } else {
            _video.current?.pause()
        }
    }, [isPlay, _video])

    useEffect(() => {
        if (isMute) {
            _video.current!.muted = true
        } else {
            _video.current!.muted = false
        }
    }, [isMute, _video])

    useEffect(() => {
        let q: NodeJS.Timeout
        if (isShow) {
            q = setTimeout(() => setIsShow(false), 3000)
        }

        return () => {
            clearTimeout(q)
        }
    }, [isShow])
    const handleClick = () => {
        if (isShow) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    return (
        <header className={styles.header}>
            <section className={styles.video_display} onClick={handleClick}>
                <video ref={_video} autoPlay muted loop>
                    <source src={intro} />
                </video>
                <div className={styles.overlay} style={{ display: isShow ? 'flex' : 'none' }}>
                    <div
                        className={isPlay ? styles.play : styles.pause}
                        onClick={() => setIsPlay(p => !p)}
                    ></div>
                    <div
                        className={isMute ? styles.mute : styles.unmute}
                        onClick={() => setIsMute(p => !p)}
                    ></div>
                </div>

            </section>
            <section className={styles.caption}>
                <div className={styles.container}>
                    <p>Explore the world of unlimited opportunities to boost your career</p>
                    <Button text='Join Waitlist' />
                </div>
            </section>
        </header>
    )
}