import styles from "./SearchResults.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { SearchField } from "../../atoms/fields/Fields"
import { ListView } from "../../atoms/lists/Lists"
import { AppBarAfterLogin } from "../../components/app_bar/AppBar"
import Footer from "../../components/footer/Footer"
import { fetchLearningContent } from "./searchResultsApi"
import { Fragment, useEffect, useState } from "react"
import { LearningContentLongContainer } from "../../components/product_container/ProductContainer"
import URLStringify from "../../atoms/url_stringify/UrlStringify"
import { Button } from "../../atoms/buttons/Buttons"

const aDay = 86400

export default function SearchResults() {
    const DEFAULT_OFFSET = 20
    const DEFAULT_LIMIT = DEFAULT_OFFSET
    let { search } = useParams()
    search = search || ''
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [searchField, setSearchField] = useState(search)
    const [datePostedGteFilter, setDatePostedGteFilter] = useState(undefined)
    const [datePostedLteFilter, setDatePostedLteFilter] = useState(undefined)
    const [costFilter, setCostFilter] = useState(undefined)
    const [now, setNow] = useState(new Date())
    const [offset, setOffset] = useState(DEFAULT_OFFSET)
    const [isNext, setIsNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const dt = new Date()
        const intv = setInterval(() => {
            setNow(new Date())
        }, 1000 * 60 * 60 * 24);
        return () => clearInterval(intv)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetchLearningContent({
            search: searchField,
            posted_gte: datePostedGteFilter,
            posted_lte: datePostedLteFilter,
            cost: costFilter,
            limit: DEFAULT_LIMIT
        })
            .then(res => {
                setItems(res.data.results)
                setIsNext(res.data.next ? true : false)
                setIsLoading(false)
                // console.log(res.data)
            })
    }, [search, datePostedGteFilter, datePostedLteFilter, costFilter])

    const handleLoadMore = () => {
        if (isNext) {
            fetchLearningContent({
                search: searchField,
                posted_gte: datePostedGteFilter,
                posted_lte: datePostedLteFilter,
                cost: costFilter,
                offset: offset,
                limit: DEFAULT_LIMIT
            })
                .then(res => {
                    setItems(prev => prev.concat(res.data.results))
                    setIsNext(res.data.next ? true : false)
                    setOffset(prev => prev + DEFAULT_OFFSET)
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchField}`)
    }

    const handleReset = () => {
        setDatePostedGteFilter(undefined)
        setDatePostedLteFilter(undefined)
        setCostFilter(undefined)
    }

    return (
        <ListView appBar={<AppBarAfterLogin />}>
            <header className={styles.header}>
                <form onSubmit={handleSubmit} className={styles.search_field}>
                    <SearchField value={searchField}
                        placeholder="Type what you want here E.g: User Experience Design"
                        onChange={e => setSearchField(e.target.value)}
                        onClear={e => setSearchField('')}
                    />
                </form>
            </header>
            <section className={styles.filter_box}>
                <div className={styles.wrapper}>
                    <URLStringify urls={[["Home", "/"], ["Learning Content", "/search/"], `${search || 'All Data'}`]} />
                    <ul className={styles.container}>
                        {/* <Dropdown
                            placeholder="Learning Content"
                            onChange={() => 1}
                            options={[]}
                        /> */}
                        <Dropdown
                            placeholder="Date Posted"
                            onChange={(e) => {
                                const dts = e.target.value.split(',')
                                setDatePostedGteFilter(dts[1])
                                setDatePostedLteFilter(dts[0])
                            }}
                            options={[
                                ["Last Month", [getDate({ month: now.getMonth() - 1 }), null]],
                                ["Last Two Month", [getDate({ month: now.getMonth() - 2 }), null]],
                                ["Last Year", [getDate({ year: now.getFullYear() - 1 }), null]],
                            ]}
                        />
                        <Dropdown
                            placeholder="Content Cost"
                            onChange={(e) => setCostFilter(e.target.value)}
                            options={[
                                ["$ 0", 0],
                                ["$ 40", 40],
                                ["$ 80", 80],
                                ["$ 120", 120],
                                ["$ 160", 160],
                                ["$ 200", 200],
                            ]}
                        />
                        <button className={styles.dropdown} onClick={handleReset}>Reset Filters</button>
                    </ul>
                </div>
            </section>
            <section className={styles.items}>
            {isLoading && <p style={{ textAlign: 'center' }}>Fetching...</p>}
                {!isLoading && items.length === 0 && <p style={{ textAlign: 'center' }}>No records found</p>}
                {items.map((item) => (
                    <LearningContentLongContainer key={item.id} {...item} />
                ))}
                <div className={styles.btns}>
                    <Button text="Load More" onClick={handleLoadMore} disabled={!isNext} />
                </div>
            </section>
            <Footer />
        </ListView>
    )
}

function getDate({ day = null, month = null, year = null }) {
    let date = new Date()
    if (day != null) {
        date = new Date(date.setUTCDate(day))
    }
    if (month != null) {
        date = new Date(date.setMonth(month))
    }
    if (year != null) {
        date = new Date(date.setFullYear(year))
    }
    return date.toLocaleDateString()
}


function Dropdown({ options, placeholder, onChange }) {
    return (
        // remember to design custom dropdown later
        // <ul>
        //     <li>Learning Material</li>
        // </ul>
        <select className={styles.dropdown} onChange={onChange}>
            <option value={''}>{placeholder}</option>
            {options.map((opt, i) => (
                <option key={i} value={opt[1]}>{opt[0]}</option>
            ))}
        </select>
    )
}


