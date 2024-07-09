/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './App';

const theme = {
    ...DefaultTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        light: "#f8f9fa",
        primary: "#0d6efd",
        secondary: "##6c757d",
        error: "#dc3545"
    },
};

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <GestureHandlerRootView>
                <App />
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);