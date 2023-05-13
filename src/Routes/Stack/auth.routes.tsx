import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Pages/Home";
import CadastroRO from "../../Pages/CadastroRO";
import TabelaROs from "../../Pages/TabelaROs";
import MembroSuporte from "../../Pages/Membro_suporte";
import CadastroUsuario from "../../Pages/CadastroUsuario";
import { propsNavigationStack } from "./Models";
import EditaRos from "../../Pages/EditarRos";
import EditarUsuario from "../../Pages/EditarUsuario";
import Chat from "../../Pages/Chat";
import Contatos from "../../Pages/Contatos";
import RedefinirSenha from "../../Pages/RedefinirSenha";
import EmailRedefinicao from "../../Pages/EmailRedenificao";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function AuthRoutes () {
    return(
        <Navigator initialRouteName="Home"  screenOptions={{headerShown : false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="CadastroRO" component={CadastroRO}/>
            <Screen name="MembroSuporte" component={MembroSuporte}/>
            <Screen name="TabelaROs" component={TabelaROs}/>
            
            <Screen name="Chat" component={Chat}/>
            <Screen name="Contatos" component={Contatos}/>
            {/* <Screen name="Notificacoes" component={Notificacoes}/>  */}
           
            <Screen name="EditaRos" component={EditaRos} />
            <Screen name="CadastroUsuario" component={CadastroUsuario}/>
            <Screen name="EditarUsuario" component={EditarUsuario}/>
            <Screen name="RedefinirSenha" component={RedefinirSenha}/>
            <Screen name="EmailRedefinicao" component={EmailRedefinicao}/>
        </Navigator>
    )
}