import { ReactElement } from "react"
import { scrollRef } from "../../app/helper"
import styles from "./List.module.scss"

interface ListViewInterface {
    appBar: ReactElement,
    children: ReactElement | ReactElement[]
}

export function ListView(props: ListViewInterface) {
    return (
        <section className={styles.list_view}>
            {props.appBar}
            <div ref={scrollRef} className={styles.children}>{props.children}</div>
        </section>
    )
}

export function List(props: { items: [title: string, content: string][] }) {
    return (
        <ul className={styles.list}>
            {props.items.map((item, index) =>
                <li key={index}>
                    <h1>{item[0]}</h1>
                    <p>{item[1]}</p>
                </li>
            )}
        </ul>
    )
}