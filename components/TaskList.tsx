import React, { useEffect, useState } from "react";

import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { TaskType } from "../interfaces";
import { getTasks } from "../providers/todo";
import Task from "./Task";

const TaskList = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isTasksLoading, setTasksLoading] = useState(true);
    
    useEffect(() => {
        getTasks()
        .then(res => setTasks(res))
        .catch(error => console.log(error))
        .finally(() => {
            setTasksLoading(false);
        })
    }, [])

    if (isTasksLoading){
        return <ActivityIndicator animating={true} />
    }
    
    return (
        <FlatList 
            style={{ marginVertical: 16, flex: 1}}
            data={tasks}
            renderItem={({item}) => (
                <Task task={item}/>
            )}
        />
    )
}
 
export default TaskList;