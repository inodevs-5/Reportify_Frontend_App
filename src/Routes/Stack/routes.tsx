import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Pages/Login";
import { propsNavigationStack } from "./Models";
import RedefinirSenha from "../../Pages/RedefinirSenha";
import EmailRedefinicao from "../../Pages/EmailRedenificao";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function Routes () {

    return(
        <Navigator initialRouteName="Login"  screenOptions={{headerShown : false}}>
            <Screen name="Login" component={Login}/>
            <Screen name="RedefinirSenha" component={RedefinirSenha}/>
            <Screen name="EmailRedefinicao" component={EmailRedefinicao}/>
        </Navigator>
    )
}