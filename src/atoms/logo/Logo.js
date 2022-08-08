import { Fragment } from "react";
import styles from './Logo.module.scss'
import logo from './assets/logo.svg'
import logo_small from './assets/logo_small.svg'
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate()
    return (
        <Fragment>
            <img src={logo} className={styles.logo} alt='logo' onClick={() => navigate('/')} draggable={false} />
            <img src={logo_small} className={styles.logo_small} alt='logo' onClick={() => navigate('/')} draggable={false} />
        </Fragment>
        
    )
}