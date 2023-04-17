import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../Pages/Home";
import CadastroRO from "../../Pages/CadastroRO";
import TabelaROs from "../../Pages/TabelaROs";
import { propsNavigationStack } from "./Models";
import CadastroUsuario from "../../Pages/CadastroUsuario";
import EditarUsuario from "../../Pages/EditarUsuario";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function AuthRoutes () {
    return(
        <Navigator initialRouteName="Home"  screenOptions={{headerShown : false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="CadastroRO" component={CadastroRO}/>
            <Screen name="TabelaROs" component={TabelaROs}/>
            <Screen name="CadastroUsuario" component={CadastroUsuario}/>
            <Screen name="EditarUsuario" component={EditarUsuario}/>
        </Navigator>
    )
}