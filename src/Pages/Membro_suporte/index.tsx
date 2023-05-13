import React, { useEffect, useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import style from './style';
import api from '../../services/api';
import Menu from '../../components/menu';

export const Membro_suporte = () =>{
  const { usuario, signOut } = useAuth();

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
      <View style={style.footer}>
      <Text style={style.title}>Membros do Suporte:</Text>
          <TouchableOpacity onPress={signOut} style={style.exitIcon} >
            <Icon name='exit-outline' size={30} />
          </TouchableOpacity>
      <View style={style.containerbusca}>
           <View style={style.container12}>
              <TextInput style={style.busca}  
                 placeholder='Buscar suporte'  
                 value={input} 
                 onChangeText={(texto => setInput(texto))}>
              </TextInput>
               <Icon name='search' size={21} style={style.searchIcon}/>
            </View>
            <View style={style.bar}/> 
          </View>
       </View>
       <View style={style.containertodomembro}>
      { 
        usuarios && !loading ? usuarios.map(usuario => (
     
      <View style={style.buttons} key={usuario._id}>
        <TouchableOpacity style={style.button}
          key={usuario._id}
          onPress={() => 
          navigation.navigate('EditarUsuario', {id:usuario._id})
          }>
          <Text key={usuario._id} style={style.enterButton}>{usuario.nome}</Text>
        </TouchableOpacity> 
      </View>
     
   )) : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#666"/>
      </View>
      }
       </View>

      <View style={{position:'absolute',  bottom: 0,}} >
      <Menu/>
      </View>
       {/* </View> */}
      </View>
  );
}




export default Membro_suporte;