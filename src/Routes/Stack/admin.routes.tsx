import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Pages/Home";
import CadastroRO from "../../Pages/CadastroRO";
import TabelaROs from "../../Pages/TabelaROs";
import MembroSuporte from "../../Pages/Membro_suporte";
import { propsNavigationStack } from "./Models";
import EditaRos from "../../Pages/EditarRos";
import CadastroUsuario from "../../Pages/CadastroUsuario";
import EditarUsuario from "../../Pages/EditarUsuario";
import Notificacoes from "../../Pages/Notificacoes";
import Chat from "../../Pages/Chat";
import Contatos from "../../Pages/Contatos";
import RedefinirSenha from "../../Pages/RedefinirSenha";
import EmailRedefinicao from "../../Pages/EmailRedenificao";
import Dashboard from "../../Pages/Dashboard";
import OpcoesExtras from "../../Pages/OpcoesExtras";


const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function AdminRoutes () {
    return(
        <Navigator initialRouteName="Home"  screenOptions={{headerShown : false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="CadastroRO" component={CadastroRO}/>
            <Screen name="TabelaROs" component={TabelaROs}/>
            <Screen name="EditaRos" component={EditaRos} />
            <Screen name="Chat" component={Chat}/>
            <Screen name="Contatos" component={Contatos}/>
            {/* <Screen name="Notificacoes" component={Notificacoes}/> */}
            <Screen name="EditarUsuario" component={EditarUsuario}/>
            <Screen name="MembroSuporte" component={MembroSuporte}/>
            <Screen name="CadastroUsuario" component={CadastroUsuario}/> 
            <Screen name="Notificacoes" component={Notificacoes}/>
            <Screen name="RedefinirSenha" component={RedefinirSenha}/>
            <Screen name="EmailRedefinicao" component={EmailRedefinicao}/>
            <Screen name="Dashboard" component={Dashboard} />
            <Screen name="OpcoesExtras" component={OpcoesExtras}/>
        </Navigator>
    )
}