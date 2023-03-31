import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../Pages/Login";
import { propsNavigationStack } from "./Models";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function Routes () {
    return(
        <Navigator initialRouteName="Login"  screenOptions={{headerShown : false}}>
            <Screen name="Login" component={Login}/>
        </Navigator>
    )
}