import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListView } from "../../atoms/lists/Lists";
import URLStringify from "../../atoms/url_stringify/UrlStringify";
import { AppBarAfterLogin } from "../../components/app_bar/AppBar";
import Footer from "../../components/footer/Footer";
import { fetchCourseDetails } from "./courseDetailsApi";
import styles from "./CourseDetails.module.scss"
import { AnchorButton, Button, ShareButton } from "../../atoms/buttons/Buttons";
import star from './assets/str.svg'
import star_solid from './assets/str_s.svg'
import time from './assets/time.svg'
import { timeSince } from "../../components/product_container/hooks";
import ReactMarkdown from "react-markdown";

export default function CourseDetails() {
    const [course, setCourse] = useState()
    const { id } = useParams()
    useEffect(() => {
        fetchCourseDetails(id)
            .then(res => setCourse(res.data))
    }, [id])
    return (
        <ListView appBar={<AppBarAfterLogin search />}>
            {course
                ?
                <section className={styles.page}>
                    <header className={styles.header}>
                        <div>
                            <URLStringify urls={["Home", "Learning Content", course.title, "Details"]} />
                            <h1>Details</h1>
                        </div>
                    </header>
                    <section className={styles.profile} style={{ backgroundImage: `linear-gradient(to bottom, transparent 45px, rgba(0,0,0, 1)), url(${course.underlay})` }}>
                        <div className={styles.wrapper}>
                            <section className={styles.container}>
                                <div className={styles.avatar}>
                                    <img src={course.icon} alt=" " />
                                </div>
                                <div className={styles.content}>
                                    <h2>{course.title}</h2>
                                    <p>{course.company} at {course.platform}</p>
                                </div>
                                <div className={styles.actions}>
                                    <AnchorButton href={course.link} text="Register Now" className={styles.register_btn} />
                                    <ShareButton id={course.id} />
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className={styles.sec2}>
                        <div className={styles.container}>
                            <div className={styles.ratings}>
                                {Array.from(Array(5)).map((_, i) => {
                                    // 10 rates for 1 star
                                    const q = Math.round((course.total_rates / 50) * 5)
                                    if (q > i) return <img src={star_solid} alt='' />
                                    return <img src={star} alt='' />
                                })}
                            </div>
                            <p className={styles.rating_count}>{Math.round((course.total_rates / 50) * 5)}.0 of 5.0</p>
                            <div className={styles.time}>
                                <img src={time} alt='' />
                                {/* There suppose to be starting and ending period to be more accurate in calculation */}
                                <h4>{timeSince(Date.parse(course.period_start), Date.parse(course.period_end))}</h4>
                            </div>
                            <h2 className={styles.cost}>${course.cost}</h2>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>About Course</h2>
                        <ReactMarkdown>{course.about}</ReactMarkdown>
                    </section>
                    <section className={styles.section}>
                        <h3>what you will learn</h3>
                        <ReactMarkdown>{course.experience}</ReactMarkdown>
                    </section>
                    <section className={styles.section}>
                        <h3>skills you will gain</h3>
                        <div className={styles.skills}>
                            <ReactMarkdown>{course.skills}</ReactMarkdown>
                        </div>
                    </section>
                    
                    <section className={styles.section}>
                        <h2>Author</h2>
                        <div className={styles.author}>
                            <div className={styles.avatar}><img src={course.icon} alt="" /></div>
                            <div>
                                <h4>{course.author}</h4>
                            </div>
                        </div>
                    </section>
                    <section className={styles.btn_container}>
                        <AnchorButton href={course.link} text="Register Now" />
                    </section>
                </section>
                : <section className={styles.loading}><div className={styles.roller}></div></section>
            }
            <Footer />
        </ListView>
    )
}