import styles from './Fields.module.scss'
import classNames from 'classnames'

const c = classNames

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string
}

export function InputField(props:InputProps) {
    return (
        <div className={styles.field_container}>
            <input {...props} className={c(styles.field, props.error && styles.error_field, props.className)} />
            {props.error && <label className={styles.error}>{props.error}</label>}
        </div>
    )
}

export function SelectField(props:{error?: any, placeholder?: string, className?:string, onChange?: (e:any) => any, option:[label:string, value:string][]}) {
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