import { createRef, LegacyRef, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import styles from './Carousel.module.scss'

import Slider from 'react-slick'

import arrowLeft from './assets/arrowLeft.svg'
import arrowRight from './assets/arrowRight.svg'

interface CarouselProps {
    items: [image: string, title: string, details: string][]
}

export function Carousel(props: CarouselProps) {
    const [items, setItems] = useState(props.items)
    const [carousel1, setCarousel1] = useState<Slider | null>()
    const [position, setPosition] = useState<number>(0)


    useEffect(() => {
      if (items.length % 2 === 1) {
        setItems(i=>i.concat(i))
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