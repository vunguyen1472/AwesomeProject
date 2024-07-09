import React from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";

import { Text, View } from "react-native";
import TaskList from "../../components/TaskList";

import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../App";

const Home = () => {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const dateTime = new Date();

    return <View style={[styles.container, { width: width }]}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerText}>Today's Tasks</Text>
                <Text style={{ color: "#919191", fontSize: 16}}>{dateTime.toDateString()}</Text>
            </View>
            <View style={styles.headerRight}>
                <Pressable style={styles.headerRightBtn} onPress={() => navigation.navigate("NewTask")}>
                    <Icon name="plus" size={24} color="#0038fb"/>
                    <Text style={{ fontSize: 16, color: "#0038fb"}}>New Task</Text>
                </Pressable>
            </View>
        </View>
        
        <TaskList />

    </View>
}
 
export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9f9f9",
        padding: 24,
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerLeft: {
        flex: 1,
        flexDirection: "column",
        gap: 8,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black"
    },
    headerRight: {
        flex: 1,
    },
    headerRightBtn: {
        backgroundColor: "#e2ebfa",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    }
});