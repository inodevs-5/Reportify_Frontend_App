import React, { useEffect, useState } from 'react';
import {Dimensions,KeyboardAvoidingView, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import Menu from '../../components/menu';
import style from './style';

export const Contatos = () =>{
    const { usuario, signOut } = useAuth();
    const {height} = Dimensions.get('screen')
    const [usuarios, setUsuarios] = useState()
  
    const navigation = useNavigation<propsStack>()
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      (async () => {
        try {
          const response = await api.get('/usuario');
  
          setUsuarios(response.data);
          setLoading(false)
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
    }, []);
  

  return (
    <View style={style.container}>
      <Text >Membros do Suporte:</Text>
      <TouchableOpacity onPress={signOut}  >
        <Icon name='exit-outline' size={30} />
      </TouchableOpacity>
      <View >
        <View >
      <TextInput 
        placeholder='Buscar suporte'  
        value={input} 
        onChangeText={(texto => setInput(texto))}>
      </TextInput>
      <Icon name='search' size={21} />
      </View>
      <View /> 
       </View>
      
      { 
        usuarios && !loading ? usuarios.map(usuario => (
      <View  key={usuario._id}>
        <TouchableOpacity 
          key={usuario._id}
          onPress={() => 
          navigation.navigate('EditarUsuario', {id:usuario._id})
          }>
          <Text key={usuario._id} >{usuario.nome}</Text>
        </TouchableOpacity> 
      </View>
   )) : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#666"/>
      </View>
      }

      <View >
    <Menu></Menu>
      </View>
       {/* </View> */}
      </View>
  );
}

export default Contatos;