import { ReactElement } from "react"
import styles from "./ListView.module.scss"

interface ListViewInterface {
    appBar: ReactElement, 
    children: ReactElement | ReactElement[]
}

export function ListView(props: ListViewInterface) {
    return (
    <section className={styles.list_view}>
        {props.appBar}
        <div className={styles.children}>{props.children}</div>
    </section>
    )
}