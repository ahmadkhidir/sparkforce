import styles from './ProductContainer.module.scss'
import share_ic from './assets/share.svg'
import { Button } from '../../atoms/buttons/Buttons'

interface ItemProps {
    id: string | number,
    label?: string,
    icon: string,
    title: string,
    text: string,
    price: number | null,
    type: string,
    timePosted: number,
}

interface ProductContainerProps {
    underline?: boolean,
    title: string,
    subTitle: string,
    items: ItemProps[],
    currency: '$' | 'P',
    onClickMore: (e: any) => any
}

export default function ProductContainer(props: ProductContainerProps) {
    return (
        <section className={styles.product_container}>
            <header>
                <h2>{props.title}</h2>
                <p>{props.subTitle}</p>
            </header>
            <section className={styles.items}>
                {props.items.map(item => (
                    <div key={item.id} className={styles.item}>
                        {item.label && <div className={styles.label}>{item.label}</div>}
                        <img src={item.icon} alt='item icon' className={styles.icon} />
                        <div className={styles.body}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                            {/* Remember to auto generate time posted here */}
                            <p>{item.timePosted} hours ago | {item.type}</p>
                        </div>
                        <div className={styles.footer}>
                            <button><img src={share_ic} alt="share" /></button>
                            <h3>{item.price === null ? 'Free' : `${props.currency}${props.currency === '$' ? item.price.toFixed(2) : item.price}`}</h3>
                        </div>
                    </div>
                ))}
            </section>
            <section className={styles.more_button}  style={{ borderBottomWidth: props.underline ? 1 : 0 }}>
                <Button text='Browse more' onClick={props.onClickMore} />
            </section>
        </section>
    )
}