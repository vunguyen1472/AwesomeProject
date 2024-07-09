import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home/Home";
import { TodoList } from "./screens/TodoList/Todo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/AntDesign';
import CreateTask from "./screens/CreateTask/CreateTask";

export type RootStackParams = {
  Home:undefined,
  NewTask: undefined
}

const Tab = createBottomTabNavigator<RootStackParams>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="NewTask" 
          component={CreateTask}
          options={{
            tabBarLabel: "New Task",
            tabBarIcon: ({ color, size }) => (
              <Icon name="pluscircleo" size={size} color={color} />
            )
          }}
        />
        {/* <Tab.Screen 
          name="Todo List" 
          component={TodoList}
          options={{
            tabBarLabel: "Todo List",
            tabBarIcon: ({ color, size }) => (
              <Icon name="profile" size={size} color={color} />
            )
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 
export default App;