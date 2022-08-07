import { createRef, LegacyRef, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import styles from './Carousels.module.scss'

import Slider from 'react-slick'

import arrowLeft from './assets/arrowLeft.svg'
import arrowRight from './assets/arrowRight.svg'
import { VideoPlayer } from '../videos/Videos'

interface CarouselProps {
    items: [image: string, title: string, details: string][]
}

interface VideoCarouselProps {
    items: [video: string, title: string, details: string][]
}

export function Carousel(props: CarouselProps) {
    const [items, setItems] = useState(props.items)
    const [carousel1, setCarousel1] = useState<Slider | null>()
    const [position, setPosition] = useState<number>(0)


    useEffect(() => {
        if (items.length % 2 === 1) {
            setItems(i => i.concat(i))
        }
    }, [])

    const handleNext = () => {
        carousel1!.slickNext()
    }
    const handlePrev = () => {
        carousel1!.slickPrev()
    }
    return (
        <div className={styles.carousel}>
            <Slider ref={(r) => setCarousel1(r)}
                arrows={false}
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={5}
                slidesToScroll={1}
                centerMode={true}
                variableWidth={true}
                afterChange={(c) => setPosition(c)}
                responsive={[{
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                    }
                }]}
            >
                {items.map((item, index) =>
                    <div key={index} className={styles.item}>
                        <img src={item[0]} className={position === index ? styles.current : styles.other} alt='' />
                    </div>
                )}
            </Slider>
            <div className={styles.controls}>
                <img src={arrowLeft} onClick={handlePrev} alt='go left' />
                <div>
                    <h1>{items[position][1]}</h1>
                    <p>{items[position][2]}</p>
                </div>
                <img src={arrowRight} onClick={handleNext} alt='go right' />
            </div>
        </div >
    )
}


export function VideoCarousel(props: VideoCarouselProps) {
    const [carousel, setCarousel] = useState<Slider | null>()

    const handleNext = () => {
        carousel!.slickNext()
    }
    const handlePrev = () => {
        carousel!.slickPrev()
    }
    return (
        <div className={styles.video_carousel}>
            <Slider ref={(e) => setCarousel(e)}
                arrows={false}
                dots={false}
                infinite={true}
                speed={1000}
                slidesToShow={1}
                slidesToScroll={1}
            >
                {props.items.map((item, index) =>
                    <div key={index} className={styles.item}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <p>{item[1]}</p>
                                <h1>“{item[2]}”</h1>
                            </div>
                            {/* <div className={styles.video} style={{ backgroundColor: item[0] }}> */}
                                <VideoPlayer src={item[0]} className={styles.video} />
                            {/* </div> */}
                        </div>

                    </div>
                )}
            </Slider>

            <div className={styles.buttons}>
                <img src={arrowLeft} onClick={handlePrev} alt='go left' />
                <img src={arrowRight} onClick={handleNext} alt='go right' />
            </div>
        </div>
    )
}