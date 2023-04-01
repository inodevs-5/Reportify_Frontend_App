import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./Stack/auth.routes";
import Routes from "./Stack/routes";
import { useAuth } from '../contexts/auth';
import { ActivityIndicator, View } from 'react-native';

export default function () {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }

   return(
    <NavigationContainer>
        {signed ? <AuthRoutes /> : <Routes />}
    </NavigationContainer>
    )

}