import styles from './ProductContainer.module.scss'
import { Button, ShareButton } from '../../atoms/buttons/Buttons'
import { useIsLatest, useTimeSince } from './hooks'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// interface ItemProps {
//     id: string | number,
//     label?: string,
//     icon: string,
//     title: string,
//     text: string,
//     price: number | null,
//     type: string,
//     timePosted: number,
// }

// interface ProductContainerProps {
//     underline?: boolean,
//     title: string,
//     subTitle: string,
//     items: ItemProps[],
//     currency: '$' | 'P',
//     onClickMore: (e: any) => any
// }

function DateTime({ dt }) {
    const dts = useTimeSince(dt)
    useEffect(() => {
    }, [dts])
    return <>{dts}</>
}

function RenderLabel({ dt }) {
    const isLatest = useIsLatest(dt)
    if (!isLatest) return <></>
    return (
        <div className={styles.label}>Latest</div>
    )
}

export default function ProductContainer(props) {

    return (
        <section className={styles.product_container}>
            <header>
                <h2>{props.title}</h2>
                <p>{props.subTitle}</p>
            </header>
            <section className={styles.items}>
                {props.items.map(item => (
                    <Link key={item.id} 
                    // to={`/course-details/${item.id}/`} 
                    to="#"
                    className={styles.item}>
                        <RenderLabel dt={item.time_posted} />
                        <img src={item.icon} alt='item icon' className={styles.icon} />
                        <div className={styles.body}>
                            <h4>{item.title}</h4>
                            <p>{item.address}</p>
                            {/* Remember to auto generate time posted here */}
                            {/* <DateTime dt={item.time_posted} /> ago  */}
                            <p> {item.company} | {item.type.replace(item.type[0], item.type[0].toUpperCase())}</p>
                        </div>
                        <div className={styles.footer}>
                            <ShareButton id={item.id} />
                            <h3>{item.point === 0 ? 'Free' : `P${item.point.toFixed(2)}`}</h3>
                        </div>
                    </Link>
                ))}
            </section>
            <section className={styles.more_button} style={{ borderBottomWidth: props.underline ? 1 : 0 }}>
                <Button text='Browse more' onClick={props.onClickMore} />
            </section>
        </section>
    )
}

export function LearningContentContainer(props) {

    return (
        <section className={styles.product_container}>
            <header>
                <h2>{props.title}</h2>
                <p>{props.subTitle}</p>
            </header>
            <section className={styles.items}>
                {props.items.map(item => (
                    <Link key={item.id} to={`/course-details/${item.id}/`} className={styles.item}>
                        <RenderLabel dt={item.time_posted} />
                        <img src={item.icon} alt='item icon' className={styles.icon} />
                        <div className={styles.body}>
                            <h4>{item.title}</h4>
                            <p>{item.company} at {item.platform}</p>
                            <p> <DateTime dt={item.time_posted} /> ago | {item.type.replace(item.type[0], item.type[0].toUpperCase())}</p>
                        </div>
                        <div className={styles.footer}>
                            <ShareButton id={item.id} />
                            <h3>{item.cost === 0 ? 'Free' : `$${item.cost.toFixed(2)}`}</h3>
                        </div>
                    </Link>
                ))}
            </section>
            <section className={styles.more_button} style={{ borderBottomWidth: props.underline ? 1 : 0 }}>
                <Button text='Browse more' onClick={props.onClickMore} />
            </section>
        </section>
    )
}


export function LearningContentLongContainer(props) {
    const navigate = useNavigate()
    return (
        <section className={styles.long_container}>
            <div className={styles.img}>
                <img src={props.icon} />
            </div>
            <div className={styles.content}>
                <h3>{props.title}</h3>
                <p>{props.company} at {props.platform}</p>
                <div className={styles.row}>
                    <p>{props.type.replace(props.type[0], props.type[0].toUpperCase())}</p>
                    <p><DateTime dt={props.time_posted} /> ago</p>
                    <p>{props.visitors.length} Visitors</p>
                </div>
            </div>
            <div className={styles.others}>
                <h2>$ {props.cost}</h2>
                <Button text='View Now' onClick={() => navigate(`/course-details/${props.id}/`)} className={styles.button} />
            </div>
        </section>
    )
}
