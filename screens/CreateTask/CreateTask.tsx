import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, TextInput, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";

import DateTimePicker from "@react-native-community/datetimepicker";

import { CategoryType, TaskType } from "../../interfaces";
import { getCategories } from "../../providers/category";
import Loading from "../../components/Loading";
import { Picker } from "@react-native-picker/picker";
import { createTask } from "../../providers/todo";

type FormData = {
    name: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    description: string,
    category: string
}

const CreateTask = () => {
    const { width, height } = useWindowDimensions();
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [isStartTimePickerOpen, setStartTimePickerOpen] = useState(false);
    const [isEndTimePickerOpen, setEndTimePickerOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        watch,
        getValues
    } = useForm<FormData>({
        defaultValues: {
            date: new Date(),
            description: "",
            category: ""
        }
    });

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res))
            .catch(error => console.log(error))
            .finally(() => setCategoriesLoading(false))
    }, [])

    const handleCreateTask = (data: FormData) => {
        const newTask: TaskType = {
            name: getValues("name"),
            description: getValues("description"),
            startTime: new Date(),
            endTime: new Date(),
            status: true
        }
        
        createTask(newTask)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

    const startTime = watch("startTime");
    const endTime = watch("endTime")

    if (isCategoriesLoading) {
        return <Loading />
    }

    return <View style={[styles.container, { width: width, height: height }]}>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 8, alignItems: "flex-end" }}>
            <Text style={styles.formLabel}>Name</Text>
            <Text style={styles.formErrorMessage}>{errors.name?.message || ""}</Text>
        </View>
        <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
                return <TextInput
                    placeholder="Name"
                    placeholderTextColor="#cdcdcd"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={styles.formTextInput}
                />
            }}
            rules={{
                required: { value: true, message: "Task's name required!" }
            }}
        />

        <View style={{ flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 8, alignItems: "flex-end" }}>
            <Text style={styles.formLabel}>Date</Text>
            <Text style={styles.formErrorMessage}>{errors.date?.message || ""}</Text>
        </View>
        <Controller
            name="date"
            control={control}
            rules={{
                required: { value: true, message: "Task's date required!" },
            }}
            render={({ field: { onChange, value } }) => (
                <React.Fragment>
                    <TextInput style={styles.formTextInput}
                        value={value?.toDateString()}
                        onPress={() => {
                            setDatePickerOpen(true);
                        }}
                    />
                    {isDatePickerOpen &&
                        <DateTimePicker
                            minimumDate={new Date()}
                            mode="date"
                            display="spinner"
                            value={value || new Date()}
                            onChange={(event, date) => {
                                setDatePickerOpen(false);
                                onChange(date)
                            }}
                        />
                    }
                </React.Fragment>
            )}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16, marginTop: 16, marginBottom: 8 }}>
            <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
                <Text style={styles.formLabel}>Start time</Text>
                <Controller
                    name="startTime"
                    control={control}
                    rules={{
                        required: { value: true, message: "Task's start time is required!" },
                        max: { value: endTime?.getTime(), message: "Invalid start/end time!" }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <React.Fragment>
                            <TextInput style={styles.formTextInput}
                                value={value?.toLocaleTimeString()}
                                onPress={() => {
                                    setStartTimePickerOpen(true);
                                }}
                            />
                            {isStartTimePickerOpen &&
                                <DateTimePicker
                                    mode="time"
                                    display="spinner"
                                    value={value || new Date()}
                                    onChange={(event, time) => {
                                        setStartTimePickerOpen(false);
                                        onChange(time)
                                    }}
                                />
                            }
                        </React.Fragment>
                    )}
                />
            </View>
            <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
                <Text style={styles.formLabel}>End time</Text>
                <Controller
                    name="endTime"
                    control={control}
                    rules={{
                        required: { value: true, message: "Task's end time is required!" },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <React.Fragment>
                            <TextInput style={styles.formTextInput}
                                value={value?.toLocaleTimeString()}
                                onPress={() => {
                                    setEndTimePickerOpen(true);
                                }}
                            />
                            {isEndTimePickerOpen &&
                                <DateTimePicker
                                    mode="time"
                                    display="spinner"
                                    value={value || new Date()}
                                    onChange={(event, time) => {
                                        setEndTimePickerOpen(false);
                                        onChange(time)
                                    }}
                                />
                            }
                        </React.Fragment>
                    )}
                />
            </View>
        </View>
        {errors.startTime && <Text style={styles.formErrorMessage}>{errors.startTime?.message}</Text>}

        <Text style={[styles.formLabel, { marginTop: 16, marginBottom: 8 }]}>Description</Text>
        <Controller
            name="description"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
                return <TextInput
                    placeholder="Description"
                    placeholderTextColor="#cdcdcd"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    numberOfLines={2}
                    style={styles.formTextInput}
                />
            }}
        />

        <Text style={[styles.formLabel, { marginTop: 16, marginBottom: 8 }]}>Category</Text>
        <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => {
                return <Picker
                    style={{ color: "black" }}
                    mode="dialog"
                    selectedValue={value}
                    onValueChange={onChange}
                >
                    {categories.map(category => {
                        return <Picker.Item key={category.id} label={category.name} value={category.id} />
                    })}
                </Picker>
            }}
        />


        
        <Pressable onPress={(handleSubmit(handleCreateTask))} style={styles.formSubmitBtn}>
            <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Create a new task</Text>
        </Pressable>
    </View>
}

export default CreateTask;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 24,
    },
    formLabel: {
        color: "#999ea3"
    },
    formErrorMessage: {
        color: "red",
        fontSize: 12,
        fontStyle: "italic"
    },
    formTextInput: {
        color: "black",
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    formSubmitBtn: {
        marginTop: 16,
        backgroundColor: "#4b7be5",
        paddingVertical: 16,
        borderRadius: 8,
    }
});