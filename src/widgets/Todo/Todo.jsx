import AddForm from "@/features/add-task"
import Button from "@/shared/ui/Button"
import SearchForm from "@/features/search-task"
import TodoInfo from "@/features/stats"
import { TodoList } from "@/entities/todo"
import { TasksContext } from "@/entities/todo"
import { useContext } from "react"
import styles from "./Todo.module.scss"

const Todo = () => {
    const {
        firstIncompleteTaskRef
    } = useContext(TasksContext)

    return (
        <div className={styles.todo}>
            <h1 className={styles.title}>Todo<span>List</span></h1>
            <AddForm className={styles.addForm} />
            <SearchForm className={styles.searchForm} />
            <TodoInfo className={styles.info} />
            <Button 
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })} 
                className={styles.scroll}
            >
                Scroll to first incomplete
            </Button>
            <TodoList className={styles.list} />
        </div>
    )
}

export default Todo