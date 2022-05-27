import { ArrowDownward, ArrowDropDown } from "@material-ui/icons"
import { ChangeEventHandler, createRef, useState } from "react"
import PhoneInput, { Value } from 'react-phone-number-input'
import arrowDown from "./assets/arrow_down.svg"
import styles from "./Fields.module.scss"


interface InputProps {
    label: string,
    required: boolean,
    placeholder?: string,
    value: string | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

interface PhoneInputProps {
    label: string,
    required: boolean,
    placeholder?: string,
    value: Value | undefined
    onChange: (value?: Value) => void
}

interface TextAreaProps {
    label: string,
    required: boolean,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}

interface SelectProps {
    label: string,
    options: string[],
    required: boolean,
    value: string | number | readonly string[] | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

interface CheckboxProps {
    label: string,
    required: boolean
}

export function InputField(props: InputProps) {
    return (
        <div className={styles.textfield}>
            <label>{props.label} :</label>
            <input value={props.value} required={props.required} onChange={props.onChange} placeholder={props.placeholder} />
        </div>
    )
}

export function TextAreaField(props: TextAreaProps) {
    return (
        <div className={styles.textarea}>
            <label>{props.label} :</label>
            <textarea required={props.required} onChange={props.onChange} placeholder={props.placeholder}></textarea>
        </div>
    )
}

export function SelectField(props: SelectProps) {
    return (
        <div className={styles.textfield}>
            <label htmlFor="country">{props.label} :</label>
            <input value={props.value} required={props.required} onChange={props.onChange} type="search" name="country" list="countryList" placeholder={props.options[0]} />
            <datalist id="countryList">
                {props.options.map((item, index) => <option key={index}>{item}</option>)}
            </datalist>
        </div>
    )
}


export function CheckboxField(props: CheckboxProps) {
    const [checked, setChecked] = useState(false)
    return (
        <div className={styles.checkbox} onClick={() => setChecked(prev => !prev)}>
            <div className={styles.container}>{checked && <div className={styles.checked}></div>}</div>
            <label>{props.label}</label>
        </div>
    )
}


export function PhoneField(props: PhoneInputProps) {
    return (
        <div className={styles.phonefield}>
            <label htmlFor="">{props.label} [International format]</label>
            <ArrowDropDown className={styles.arrow}/>
            <PhoneInput
                value={props.value}
                onChange={props.onChange}
                className={styles.input}
            />
        </div>

    )
}