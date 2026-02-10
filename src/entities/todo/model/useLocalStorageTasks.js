const useLocalStorageTasks = () => {
    let savedTasks = localStorage.getItem("tasks")

    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    return {
        savedTasks: savedTasks ? JSON.parse(savedTasks) : [],
        saveTasks
    }
}

export default useLocalStorageTasks