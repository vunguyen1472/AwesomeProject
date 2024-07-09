import React, { useState } from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
    placeholder?: string,
    value: Date,
    textInputStyle?:  StyleProp<TextStyle> | undefined,
    mode: "date" | "time",
    onChange: (...event: any[]) => void;
}

const DateTimeInput = ({ placeholder, value, textInputStyle, mode, onChange } : Props) => {
    const [isDatetimePickerOpen, setDatetimePickerOpen] = useState(false);

    return <React.Fragment>
        <TextInput 
            placeholder={placeholder} placeholderTextColor={"#cdcdcd"}
            value={value?.toDateString()}
            style={textInputStyle}
            onPress={() => {
                setDatetimePickerOpen(true);
            }}
        />
        {isDatetimePickerOpen && 
            <DateTimePicker 
                mode={mode}
                display="spinner"
                value={value}
                onChange={(event, date) => {
                    setDatetimePickerOpen(false);
                    onChange(date)
                }}
            />
        }
    </React.Fragment>
}
 
export default DateTimeInput;