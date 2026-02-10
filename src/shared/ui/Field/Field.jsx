import clsx from "clsx"
import styles from "./Field.module.scss"

const Field = (props) => {
    const {
        className,
        id,
        text,
        inputmode="text",
        type="text",
        value,
        onInput,
        ref,
        error
    } = props

    return (
        <div className={clsx(styles.field, className)}>
            <label htmlFor={id} className={`${styles.label} visually-hidden`}>{text}</label>
            <input ref={ref} value={value} onInput={onInput} autoComplete="off" className={clsx(styles.input, error ? "isError" : "")} inputMode={inputmode} id={id} type={type} placeholder={text} />
            {error && (
                <span className={styles.error} title={error}>{error}</span>
            )}
        </div>
    )
}

export default Field