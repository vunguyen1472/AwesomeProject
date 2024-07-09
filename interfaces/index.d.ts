export type TaskType = {
    name: string,
    description?: string,
    startTime: Date,
    endTime: Date,
    status: boolean
    category?: number,
    id?: number,
}

export type CategoryType = { 
    name: string,
    id: number
}