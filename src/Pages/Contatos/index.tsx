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

  

  return (
    <View style={style.container}>
      <Text style={style.titulo}>Meus Chats</Text>
            <View  style={style.containermensagens}>
            <ScrollView style={style.scroll} >
          {
            myRos && !loading ? myRos.map(ro => (
            <View style={style.chat} key={ro._id} >
            <TouchableOpacity  onPress={() => 
            navigation.navigate('Chat')
            } >
              <Text >{ro.relator.nome}</Text>
              <Text >{ro.tituloOcorrencia}</Text>
              </TouchableOpacity>
              </View>
            )) :
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666"/>
          </View>
          }
          </ScrollView>
          <Image
              source={{ uri: 'https://api.dicebear.com/6.x/pixel-art/svg' }}
              style={{ width: 200, height: 200 }}
              />
              

            </View>
      <View style={{position:'absolute',  bottom: 0,}}>
        <Menu/>
      </View>
      </View>
  );
}

export default Contatos;