import clsx from "clsx"
import styles from "./Button.module.scss"

const Button = (props) => {
    const {
        className,
        type="button",
        children,
        onClick,
        isDisabled
    } = props

    return (
        <button disabled={isDisabled} className={clsx(styles.button, className)} type={type} onClick={onClick}>{children}</button>
    )
}

export default Button