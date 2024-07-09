import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native"

import Icon from 'react-native-vector-icons/AntDesign';
import CreateTaskForm from "./CreateTaskForm";

export const CreateTask = () => {
    const [isPressIn, setIsPressIn] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);

    return <React.Fragment>
        <Pressable 
            onPressIn={() => setIsPressIn(true)}
            onPressOut={() => setIsPressIn(false)}
            onPress={() => setFormOpen(prev => !prev)}
            style={[
                styles.createButton,
                {
                    backgroundColor: isPressIn ? "#9a9a9a" : "white"
                }
            ]}
        >
            <Icon 
                name="plus" 
                size={40} 
                color={isPressIn ? "white" : "#9a9a9a"}
            />
        </Pressable>
        {isFormOpen && <View style={styles.createForm}>
            <CreateTaskForm />
        </View>}
    </React.Fragment>
}

const styles = StyleSheet.create({
    createButton: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "#9a9a9a",
        position: "relative",
        zIndex: 2
    },
    createForm: {
        position: "absolute",
        bottom: "-200%",
        right: "50%",
        zIndex: 1
    }
});
 