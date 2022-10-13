import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './UrlStringify.module.scss'

export default function URLStringify({ urls }) {
    return (
        <ul className={styles.container}>
            {urls.map((url, i) => (
                <Fragment key={i}>
                    {typeof url === 'string' && <li>{url}</li>}
                    {typeof url === 'object' && <li><Link to={url[1]}>{url[0]}</Link></li>}
                    {i !== urls.length - 1 && ">"}
                </Fragment>
            ))}
        </ul>
    )
}