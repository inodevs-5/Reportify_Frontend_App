import { Text, View } from 'react-native'

export const RedefinirSenha = ({ route }) =>{
    const id = route.params.id

  return (
    <View>
        <Text>id: {id}</Text>
        <Text>Redefinir Senha</Text>
    </View>
    
  );
}

export default RedefinirSenha;