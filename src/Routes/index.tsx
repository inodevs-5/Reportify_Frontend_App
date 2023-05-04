import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./Stack/auth.routes";
import Routes from "./Stack/routes";
import { useAuth } from '../contexts/auth';
import { ActivityIndicator, View } from 'react-native';
import AdminRoutes from "./Stack/admin.routes";

export default function () {
    const { signed, loading, usuario } = useAuth();

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }

    const linking = {
        prefixes: ["app://reportify", "http://reportify-app-inodevs-2023"],
        config: {
            screens: {
                Login: {
                    path: ""
                },
                RedefinirSenha: {
                    path: "senha/:id",
                    parse: {
                        id: (id) => `${id}`,
                    }
                }
            }
        }
    }  

   return(
    <NavigationContainer linking={linking}>
        {usuario && usuario.perfil == "admin" ? <AdminRoutes /> : signed ? <AuthRoutes /> : <Routes />}
    </NavigationContainer>
    )

}