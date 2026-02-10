import clsx from "clsx"
import Field from "@/shared/ui/Field"
import { TasksContext } from "@/entities/todo"
import { useContext } from "react"

const SearchForm = (props) => {
    const {
        className
    } = props

    const {
        searchTask,
        setSearchTask
    } = useContext(TasksContext)

    return (
        <form className={clsx("search-form", className)}>
            <Field value={searchTask} onInput={({target}) => setSearchTask(target.value)} id="search-task" className="search-form__field" text="Search task" type="search" inputmode="search" />
        </form>
    )
}

export default SearchForm