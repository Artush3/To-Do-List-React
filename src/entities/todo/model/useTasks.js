import { useRef, useState, useCallback, useMemo, useEffect, useReducer } from "react"
import taskAPI from "@/shared/api/tasks"

const tasksReducer = (state, action) => {
    switch(action.type) {
        case "SET_ALL": {
            return Array.isArray(action.tasks) ? action.tasks : state
        } 
        case "ADD": {
            return [action.task, ...state]
        }
        case "TOGGLE_COMPLETE": {
            const { id, isDone } = action

            return state.map(task => {
                return task.id === id ? {...task, isDone} : task
            })
        }
        case "DELETE": {
            return state.filter(task => task.id !== action.id)
        }
        case "DELETE_ALL": {
            return []
        }
        default: {
            return state
        }
    }
}

const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [])
    const [titleTask, setTitleTask] = useState("")
    const [searchTask, setSearchTask] = useState("")
    const [disappearing, setDisappearing] = useState(null)
    const [appearing, setAppearing] = useState(null)

    const newTaskInputRef = useRef(null)

    const handleDeleteAllTasks = useCallback(() => {
        const isConfirmed = confirm("Вы действительно хотите удалить все задачи ?")
        
        isConfirmed && (
            taskAPI.deleteAllTask(tasks).then(() => dispatch({ type: "DELETE_ALL" }))
        )
    }, [tasks])

    const handleChangeDone = useCallback((idTask, isDone) => {
        taskAPI.changeDone(idTask, isDone)
            .then(() => {
                dispatch({ type: "TOGGLE_COMPLETE", id: idTask, isDone })
            })
    }, [])

    const handleAddTask = useCallback((taskTitle) => {
        let newTask = {
            title: taskTitle,
            isDone: false
        }

        taskAPI.addTask(newTask)
            .then(data => {
                dispatch({ type: "ADD", task: data })
                setTitleTask("")
                setSearchTask("")
                newTaskInputRef.current.focus()
                setAppearing(data.id)
                setTimeout(() => {
                    setAppearing(null)
                }, 400)
            })
    }, [])

    const handleDeleteTask = useCallback((idTask) => {
        taskAPI.deleteTask(idTask)
            .then(() => {
                setDisappearing(idTask)
                setTimeout(() => {
                    dispatch({ type: "DELETE", id: idTask })
                    setDisappearing(null)
                }, 400)
            })
    }, [])

    let filteredTask = useMemo(() => {
        return searchTask.trim().length > 0 ? tasks.filter(({title}) => title.includes(searchTask)) : null
    }, [searchTask, tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()

        taskAPI.getTasks().then(data => dispatch({ type: "SET_ALL", tasks: data }))
    }, [])
    
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
        appearing
    }
}

export default useTasks