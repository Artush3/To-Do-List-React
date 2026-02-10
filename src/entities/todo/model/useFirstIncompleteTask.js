import { useRef } from "react"

const useFirstIncompleteTask = (tasks) => {
    const firstIncompleteTaskRef = useRef(null)
    const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

    return {
        firstIncompleteTaskRef, 
        firstIncompleteTaskId
    }
}

export default useFirstIncompleteTask