import {NativeStackNavigationProp} from '@react-navigation/native-stack'


export type propsNavigationStack = {
    Home:undefined
    Login:undefined
    CadastroRO:undefined
    TabelaROs:undefined
    EditaRos:undefined
    CadastroUsuario:undefined
    EditarUsuario:undefined
    MembroSuporte:undefined
    RedefinirSenha:undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>