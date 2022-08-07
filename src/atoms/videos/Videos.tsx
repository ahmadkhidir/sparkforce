import { createRef, useEffect, useState } from 'react'
import styles from './Videos.module.scss'

export function VideoPlayer(props: {src: string, className?: string, autoplay?: boolean}) {
    const [isPlay, setIsPlay] = useState(props.autoplay!= null ? props.autoplay : false)
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
        <div className={props.className} onClick={handleClick}>
            <div className={styles.video}>
            <video ref={_video} autoPlay muted loop>
                <source src={props.src} />
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
        </div>
        </div>
        
    )
}