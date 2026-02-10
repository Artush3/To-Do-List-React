import { createContext, useMemo } from "react"
import useTasks from "./useTasks"
import useFirstIncompleteTask from "./useFirstIncompleteTask"

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {
        children
    } = props

    const {
        tasks,
        titleTask, 
        setTitleTask,
        searchTask, 
        setSearchTask,
        newTaskInputRef,
        handleDeleteAllTasks,
        handleChangeDone,
        handleAddTask,
        handleDeleteTask,
        filteredTask,
        disappearing,
        appearing
    } = useTasks()

    const {
        firstIncompleteTaskRef, 
        firstIncompleteTaskId
    } = useFirstIncompleteTask(tasks)

    const value = useMemo(() => {
        return {
            tasks,
            titleTask, 
            setTitleTask,
            searchTask, 
            setSearchTask,
            newTaskInputRef,
            handleDeleteAllTasks,
            handleChangeDone,
            handleAddTask,
            handleDeleteTask,
            filteredTask,
            disappearing,
            appearing,
            firstIncompleteTaskRef, 
            firstIncompleteTaskId
        }
    }, [
        tasks,
        titleTask, 
        setTitleTask,
        searchTask, 
        setSearchTask,
        newTaskInputRef,
        handleDeleteAllTasks,
        handleChangeDone,
        handleAddTask,
        handleDeleteTask,
        filteredTask,
        disappearing,
        appearing,
        firstIncompleteTaskRef, 
        firstIncompleteTaskId
    ])

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}