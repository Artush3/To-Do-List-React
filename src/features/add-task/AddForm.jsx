import clsx from "clsx"
import Field from "@/shared/ui/Field"
import Button from "@/shared/ui/Button"
import { TasksContext } from "@/entities/todo"
import { useContext, useState } from "react"
import styles from "./AddForm.module.scss"

const AddForm = (props) => {
    const {
        className,
    } = props

    const {
        handleAddTask,
        titleTask,
        setTitleTask,
        newTaskInputRef
    } = useContext(TasksContext)

    let [error, setError] = useState("")

    let titleForTask = titleTask.trim()
    let lengthTitle = titleForTask.length === 0

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!lengthTitle) {
            handleAddTask(titleForTask)
        }
    } 

    const handleInput = (event) => {
        const { value } = event.target
        let hasFullSpace = value.length > 0 && value.trim().length === 0

        setError(hasFullSpace ? "Should not contain only spaces" : "")
        setTitleTask(value)
    }

    return (
        <form className={clsx(styles.addForm, className)} onSubmit={handleSubmit}>
            <Field error={error} ref={newTaskInputRef} value={titleTask} onInput={handleInput} className={styles.field} text="Add new task" id="add-task" />
            <Button isDisabled={lengthTitle} className={styles.button} type="submit">Add</Button>
        </form>
    )
}

export default AddForm