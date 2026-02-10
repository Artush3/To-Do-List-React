import clsx from "clsx"
import Button from "@/shared/ui/Button"
import { memo, useContext } from "react"
import { TasksContext } from "@/entities/todo"
import styles from "./TodoInfo.module.scss"

const TodoInfo = (props) => {
    const {
        className
    } = props

    const {
        tasks,
        handleDeleteAllTasks
    } = useContext(TasksContext)

    let lengthTaskList = tasks.length
    let counterDone = tasks.filter(({isDone}) => isDone).length
    let isHasButton = lengthTaskList > 0

    return (
        <div className={clsx(styles.todoInfo, className)}>
            <div className={styles.information}>
                <p className={styles.title}>Total</p>
                <span className={styles.counter}>{lengthTaskList}</span>
            </div>
            {isHasButton && (
                <Button className={styles.deleteAll} onClick={handleDeleteAllTasks}>Delete all tasks</Button>
            )}
            <div className={styles.information}>
                <p className={styles.title}>Complete</p>
                <span className={styles.counter}>{counterDone}</span>
            </div>
        </div>
    )
}

export default memo(TodoInfo)