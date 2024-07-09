import React, { useEffect } from "react";
import { useState } from "react";

import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Task from "./Task";
import { getTasks } from "../../providers/todo";
import Loading from "../Loading/Loading";

import { TaskType } from "../../interfaces";
import { CreateTask } from "./CreateTask";


export const TodoList = () => {
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskType[]>([])

    useEffect(() => {
        getTasks()
            .then(res => {
                setTasks(res);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setTasksLoading(false);
            })
    }, [])

    const handleChangeTaskStatus = (taskId: number) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (taskId == task.id) {
                return {
                    ...task,
                    status: task.status === "pending" ? "done" : "pending"
                }
            }
            return task
        }))
    }

    if (isTasksLoading) {
        return <Loading />
    }

    return <View style={styles.container}>
        <Text style={styles.headerText}>Today's Tasks</Text>
        <FlatList
            data={tasks}
            style={{ marginTop: 16 }}
            renderItem={({ item }) => {
                return <View style={styles.listItem}>
                    <Task taskInfo={item} handleChangeTaskStatus={handleChangeTaskStatus} />
                </View>
            }}
        />
        <View style={styles.createTask}>
            <CreateTask />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    headerText: {
        color: "black",
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    flatList: {
        marginTop: 16,
    },
    listItem: {
        padding: 8,
        marginVertical: 8,
        borderRadius: 8,
    },
    createTask: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 16,
    }
});
