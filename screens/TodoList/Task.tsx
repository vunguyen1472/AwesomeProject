import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableNativeFeedback } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/AntDesign';

import { TaskType } from "../../interfaces";

type Props = {
    taskInfo: TaskType,
    handleChangeTaskStatus: (taskId: number) => void
}

const Task = (props: Props) => {    
    const { taskInfo, handleChangeTaskStatus } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return <View>
        <View style={styles.header}>
            <BouncyCheckbox
                isChecked={taskInfo.status === "pending" ? false : true}
                size={20}
                fillColor="#C0C0C0"
                textComponent={
                    <Text 
                        numberOfLines={1} 
                        style={{ 
                            marginLeft: 8, 
                            textDecorationLine: `${taskInfo.status === "pending" ? "none" : "line-through"}`,
                            color: "black"
                        }}
                    >
                        {taskInfo.name}
                    </Text>
                }
                style={{ width: "80%"}}
                iconStyle={{ borderColor: "#C0C0C0" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() => {handleChangeTaskStatus(taskInfo.id)}}
            />
            <TouchableNativeFeedback onPress={() => setIsDropdownOpen(prev => !prev)}>
                <Icon name={isDropdownOpen ? "caretup" : "caretdown"} size={20}/>
            </TouchableNativeFeedback>
        </View>
        {isDropdownOpen && <View style={styles.dropdown}>
            <View>
                <Text style={{ fontWeight: "600" }}>Name: </Text>
                <Text>{taskInfo.name}</Text> 
            </View>
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontWeight: "600" }}>Due date: </Text>
                {/* <Text>{taskInfo.createdDate}</Text>  */}
            </View>
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontWeight: "600" }}>Description: </Text>
                <Text>{taskInfo.description}</Text> 
            </View>
        </View>}
    </View>
}
 
export default Task;

const styles = StyleSheet.create({
    header: {
        height: 64,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "black"
    },
    dropdown: {
        marginTop: 8,
        padding: 10,
        borderTopWidth: 0,
        borderWidth: 1,
        borderBottomEndRadius: 8
    }
})