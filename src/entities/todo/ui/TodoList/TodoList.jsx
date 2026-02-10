import clsx from "clsx"
import TodoItem from "../TodoItem"
import emptyImage from "@/shared/assets/images/clipboard.svg"
import { memo, useContext } from "react"
import { TasksContext } from "@/entities/todo"
import styles from "./TodoList.module.scss"

const TodoList = (props) => {
    const {
        className,
    } = props

    const {
        tasks,
        filteredTask
    } = useContext(TasksContext)

    let hasTasks = tasks.length > 0
    let hasFilter = filteredTask?.length === 0

    if(!hasTasks || (hasTasks && hasFilter)) {
        return (
            <div className={styles.empty}>
                <img className={styles.emptyImage} src={emptyImage} alt="" width={56} height={56} loading="lazy" />
            </div>
        )
    }

    return (
        <ul className={clsx(styles.todoList, className)}>
            {(filteredTask ?? tasks).map((task) => (
                <TodoItem key={task.id} className={styles.item} {...task} />
            ))}
        </ul>
    )
}

export default memo(TodoList)