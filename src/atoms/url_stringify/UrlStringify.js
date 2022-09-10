import { Fragment } from 'react'
import styles from './UrlStringify.module.scss'

export default function URLStringify({ urls }) {
    return (
        <ul className={styles.container}>
            {urls.map((url, i) => (
                <Fragment key={i}>
                    <li>{url}</li>
                    {i !== urls.length - 1 && ">"}
                </Fragment>
            ))}
        </ul>
    )
}