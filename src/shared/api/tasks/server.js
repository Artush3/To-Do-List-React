let api = "http://localhost:3001/tasks"

let headers = {
    "Content-Type": "application/json"
}

const serverAPI = {
    getTasks: async () => {
        const response = await fetch(api)
        return await response.json()
    },
    getById: async (id) => {
        const response = await fetch(`${api}/${id}`)
        return await response.json()
    },
    addTask: async (newTask) => {
        const response = await fetch(api, {
            method: "POST",
            headers,
            body: JSON.stringify(newTask)
        })
        return await response.json()
    },
    deleteTask: (idTask) => {
        return fetch(`${api}/${idTask}`, {
            method: "DELETE"
        })
    },
    deleteAllTask: (tasks) => {
        return Promise.all(
            tasks.map(({id}) => {
                serverAPI.deleteTask(id)
            })
        )
    },
    changeDone: (idTask, isDone) => {
        return fetch(`${api}/${idTask}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({isDone})
        })
    },
}

export default serverAPI