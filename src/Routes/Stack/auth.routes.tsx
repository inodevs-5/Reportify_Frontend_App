import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Pages/Home";
import CadastroRO from "../../Pages/CadastroRO";
import TabelaROs from "../../Pages/TabelaROs";
import { propsNavigationStack } from "./Models";
import EditaRos from "../../Pages/EditarRos";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function AuthRoutes () {
    return(
        <Navigator initialRouteName="Home"  screenOptions={{headerShown : false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="CadastroRO" component={CadastroRO}/>
            <Screen name="TabelaROs" component={TabelaROs}/>
            <Screen name="EditaRos" component={EditaRos} />
        </Navigator>
    )
}