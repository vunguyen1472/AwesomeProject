import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useWindowDimensions } from 'react-native';

type FormData = {
    name: string,
    description: string,
    // dueDate: Date
}

const CreateTaskForm = () => {
    const { height, width } = useWindowDimensions();
    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormData>();


    const handleCreateTask = (data: FormData) => {
        console.log(data);
    }

    return <View style={styles.formContainer}>
        <Text style={styles.formHeaderText}>New Task</Text>
        <View
            style={[
                styles.form,
                {
                    minWidth: width / 1.5
                }
            ]}
        >
            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                    return <TextInput
                        placeholder="Name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={styles.formTextInput}
                    />
                }}
            />

            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                    return <TextInput
                        placeholder="Description"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        multiline={true}
                        numberOfLines={2}
                        style={styles.formTextInput}
                    />
                }}
            />

            <Pressable
                style={styles.formSubmitBtn}
                onPress={handleSubmit(handleCreateTask)}
            >
                <Text style={{ textAlign: "center", fontWeight: "600" }}>Create</Text>
            </Pressable>
        </View>
    </View>
}

export default CreateTaskForm;

const styles = StyleSheet.create({
    formContainer: {
        padding: 16,
        borderWidth: 1,
        backgroundColor: "#eeeeee",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.44,
        },
        shadowOpacity: 10.32,
        shadowRadius: 2.62,

        elevation: 16,
    },
    formHeaderText: {
        fontSize: 16,
        fontWeight: "600",
    },
    form: {
        marginVertical: 8
    },
    formTextInput: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        marginVertical: 8,
        borderColor: "#dddddd",
        borderWidth: 1,
        borderRadius: 8
    },
    formSubmitBtn: {
        padding: 8,
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: "#dddddd"
    }
});