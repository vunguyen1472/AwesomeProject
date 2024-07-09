import { TaskType } from "../interfaces";

export const getTasks = async () => {
    try {
        const response = await fetch("https://66863e1e83c983911b014bc2.mockapi.io/task");
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error)
    } 
}

export const createTask = async (task: TaskType) => {
    try {
        const response = await fetch("https://66863e1e83c983911b014bc2.mockapi.io/task", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: task.name,
                description: task.description,
                startTime: task.startTime,
                endTime: task.endTime,
                category: task.category,
                status: task.status
            })
        })
        Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error)
    }
}

export const removeTask = async (taskId: number) => {
    try {
        if (taskId == -1){
            Promise.reject(new Error("Invalid task id"))
        }
        const response = await fetch(`https://66863e1e83c983911b014bc2.mockapi.io/task/${taskId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error)
    }
}