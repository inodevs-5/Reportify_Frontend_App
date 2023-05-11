import React, { useEffect, useState } from 'react';
import {Dimensions,KeyboardAvoidingView, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import Menu from '../../components/menu';
import style from './style';

export const Contatos = () =>{

  // interface Imessage{
  
  // }


    const { usuario, signOut } = useAuth();
    const {height} = Dimensions.get('screen')
    const [usuarios, setUsuarios] = useState()
    const [errorMessage, setErrorMessage] = useState(null);
    const navigation = useNavigation<propsStack>()
    const [input, setInput] = useState('');
    const [ros, setRos] = useState();
    const [myRos, setMyRos] = useState();
    const [allRos, setAllRos] = useState();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      (async () => {
        try {
         
            const response = await api.get('/ro/atribuido/' + usuario._id);
            setMyRos(response.data);
          setLoading(false);
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
    }, []);

    function handlePress(destinatario): void {
      navigation.navigate('Chat' , {destinatario})
      console.warn(`${destinatario} `)
    }

  return (
    <View style={style.container}>
      <Text style={style.titulo}>Meus Chats</Text>
            <View  style={style.containermensagens}>
            <ScrollView style={style.scroll} >
          {
            myRos && !loading ? myRos.map(ro => (
            
            <TouchableOpacity style={style.containerchat} key={ro._id}   
            onPress={() => handlePress(ro.relator.nome)}
            >
              <View style={style.chat} >
              <View style={style.containerIcone} >
                <Text style={style.icone}>{ 
                usuario.perfil == 'cliente' ? ro.suporte.colaboradorIACIT.nome.charAt(0).toUpperCase()
                 : ro.relator.nome.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={style.container_nome} >
                <Text style={style.nome}>{ 
                usuario.perfil == 'cliente' ? ro.suporte.colaboradorIACIT.nome
                 : ro.relator.nome}</Text>
                <Text>{ro.tituloOcorrencia}</Text>
              </View>
              </View>
              <View style={style.bar}/>
              </TouchableOpacity>
            )) :
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666"/>
          </View>
          }
          </ScrollView>
              

            </View>
      <View style={{position:'absolute',  bottom: 0,}}>
        <Menu/>
      </View>
      </View>
  );
}

export default Contatos;