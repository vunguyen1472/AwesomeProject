import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Card, useTheme, Text, Divider, Portal, Dialog } from "react-native-paper";
import { TaskType } from "../interfaces";
import { Swipeable } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { removeTask } from "../providers/todo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../App";
dayjs().locale("vi")

type Props = {
    task: TaskType
}


const Task = ({ task }: Props) => {
    const theme = useTheme();
    const [isCardContentOpen, setCardContentOpen] = useState(false);
    const [isPortalOpen, setPortalOpen] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const toggleCardContent = () => {
        setCardContentOpen(prev => !prev)
    }

    const getSubtitle = (startTime: Date, endTime: Date) => {
        const startTimeString = dayjs(task.startTime).format('h:mm A');
        const endTimeString = dayjs(task.endTime).format('h:mm A');

        return startTimeString + " - " + endTimeString;
    }
    
    const handleRemoveTask = () => {
        removeTask(task.id ? task.id : -1)
        .then(res => setPortalOpen(false))
        .catch(error => console.log(error))
        .finally(() => {navigation.navigate("Home")})
    }

    const rightSwipe = () => {

        return <View style={styles.swipeRightSection}>
            <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: theme.colors.error}]} onPress={() => setPortalOpen(true)}>
                {/* <Text>Remove</Text> */}
                <Icon name="delete" size={20} />
            </TouchableOpacity>
            <Portal>
                <Dialog visible={isPortalOpen} onDismiss={() => setPortalOpen(false)}>
                    <Dialog.Content>
                        <Text>Do you want to delete this task?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={{ flexDirection: "row", gap: 16}}>
                        <TouchableOpacity onPress={() => setPortalOpen(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRemoveTask}>
                            <Text>Ok</Text>
                        </TouchableOpacity>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    }

    return (
        <Card style={[styles.card, { backgroundColor: theme.colors.light }]}>
            <Swipeable renderRightActions={rightSwipe} enabled={!isCardContentOpen}>
                <TouchableOpacity onPress={toggleCardContent}>
                    <Card.Title
                        title={task.name} titleNumberOfLines={1} titleVariant="titleMedium" titleStyle={{ textAlignVertical: "center" }}
                        subtitle={getSubtitle(task.startTime, task.endTime)} subtitleVariant="bodyMedium"
                    />
                </TouchableOpacity>
            </Swipeable>
            {isCardContentOpen &&
                <Card.Content>
                    <Divider />
                    <View style={styles.cardBodySection}>
                        <Text variant="labelLarge">Description</Text>
                        <Text variant="bodyMedium">{task?.description}</Text>
                    </View>
                    <Divider />
                    <View style={styles.cardBodySection}>
                        <Text variant="labelLarge">
                            Category:
                            <Text variant="bodyMedium"> {task?.name}</Text>
                        </Text>
                    </View>
                </Card.Content>
            }
        </Card>
    )
}

export default Task;

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        shadowColor: "transparent",
        borderWidth: 0.5
    },
    cardBodySection: {
        marginVertical: 8
    },
    swipeRightSection: {
        // height: "100%",
        width: "25%",
        // borderWidth: 0.5,
        // borderLeftWidth: 0, 
        borderRadius: 4,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center"
    },
    deleteBtn: {
        borderRadius: 8,
        padding: 8
    }
})