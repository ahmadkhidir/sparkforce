import styles from './Fields.module.scss'
import classNames from 'classnames'
import close_ic from './assets/close.svg'
import search_ic from './assets/search.svg'
import { createRef, useEffect, useRef } from 'react'

const c = classNames

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string
}

interface SearchProps extends InputProps {
    onClear?: (e:any) => any
}

export function InputField(props: InputProps) {
    return (
        <div className={styles.field_container}>
            <input {...props} className={c(styles.field, props.error && styles.error_field, props.className)} />
            {props.error && <label className={styles.error}>{props.error}</label>}
        </div>
    )
}

export function SearchField(props: SearchProps) {
    
    return (
        <div className={styles.field_container}>
            <div className={styles.search_field}>
                <input {...props} type={'search'} className={c(styles.field, props.error && styles.error_field, props.className)} />
                <button type='reset' onClick={props.onClear}><img src={close_ic} alt='reset' /></button>
                <button type='submit'><img src={search_ic} alt='search' /></button>
            </div>
            {props.error && <label className={styles.error}>{props.error}</label>}
        </div>
    )
}

export function SelectField(props: { error?: any, placeholder?: string, className?: string, onChange?: (e: any) => any, option: [label: string, value: string][] }) {
    return (
        <div className={styles.field_container}>
            <select onChange={props.onChange} className={c(styles.field, props.error && styles.error_field, props.className)}>
                <option value={undefined}>{props.placeholder}</option>
                {props.option.map((item, i) => (
                    <option key={i} value={item[1]}>{item[0]}</option>
                ))}
            </select>
            {props.error && <label className={styles.error}>{props.error}</label>}
        </div>
    )
}

export function CheckBoxField(props: { label: string, checked: boolean, onChange?: (e: any) => any }) {
    return (
        <div className={styles.checkbox}>
            <input id='checkbox' type={'checkbox'} checked={props.checked} onChange={props.onChange} />
            <label htmlFor='checkbox'>{props.label}</label>
        </div>
    )
}