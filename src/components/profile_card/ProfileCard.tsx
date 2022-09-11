import Avatar from "../../atoms/avatar/Avatar";
import styles from './ProfileCard.module.scss'
import img_ic from './assets/avatar.svg'
import arrow_ic from './assets/arrow.svg'
import { useEffect, useState } from "react";
import { fetchUserInfo } from "./ProfileCardApi";

export function ProfileCard(props: any) {
    const [user, setUser] = useState<any>()
    useEffect(() => {
      fetchUserInfo()
      .then(res=> {
        console.log(res.data)
        setUser(res.data)})
    }, [])
    
    return (
        <section className={styles.profile_card}>
            <Avatar image={img_ic} size={65} />
            <div className={styles.content}>
                <h2>{user && user.first_name + " " + user.last_name}</h2>
                <p></p>
            </div>
            <button className={styles.btn}>
                <img src={arrow_ic} alt={'arrow'} />
            </button>
        </section>
    )
}