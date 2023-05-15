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

  interface myro{
    destinatario?:string
  }


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
           if (usuario.perfil == "admin") {
            const response = await api.get('/ro/atribuido/' + usuario._id);
            setMyRos(response.data);
          setLoading(false);
        }else{
          const response2 = await api.get('/ro/relator/' + usuario._id);
          console.log(response2.data[0].relator.id._id)
          setRos(response2.data);
        }
        setLoading(false);
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
      
    })();
    }, []);

    function handlePress(destinatario:string): void {
      navigation.navigate('Chat' , {destinatario})
    }

    function esperar () : void {
      Alert.alert("Ainda nao há um colaborador")
    }

    function error () : void {
      Alert.alert("Não é possivel acessar esse Chat")
    }
    

  return (
    <View style={style.container}>
      <Text style={style.titulo}>Meus Chats</Text>
            <View  style={style.containermensagens}>
            <ScrollView style={style.scroll} >
              
          {  usuario.perfil == 'admin' ? (

          myRos && !loading ? myRos.map(ro => (
            
            
            <TouchableOpacity style={style.containerchat} key={ro._id}   
            onPress={() => ro.relator.id ?  handlePress(ro.relator.id._id) : error() }
            >
              <View style={ro.relator.id ? style.chat : style.error} >
              <View style={ro.relator.id ? style.containerIcone : style.Id} >
              <Text style={style.icone}>{ro.relator.id ? ro.relator.id.nome.charAt(0).toUpperCase() : "N"}
                   </Text>
              </View>
              <View style={style.container_nome} >
                <Text style={ro.relator.id ? style.nome : style.nome_naodefido }>{ 
                ro.relator.id ? ro.relator.id.nome : "Não é possivel acessar"}</Text>
                <Text style={ro.relator.id  ? style.preto : style.branco }>{ro.tituloOcorrencia}</Text>
              </View>
              </View>

              <View style={style.bar}/>
              </TouchableOpacity>
            )) :
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666"/>
          </View>
          ): (
            ros && !loading ? ros.map(ro => (
            
              <TouchableOpacity style={style.containerchat} key={ro._id}   
              onPress={() => ro.suporte && ro.suporte.colaboradorIACIT ? handlePress(ro.suporte.colaboradorIACIT.id._id) : esperar() }
              >
                <View style={ro.suporte ? style.chat : style.error} >
                <View style={ro.suporte ? style.containerIcone : style.Id} >
                <Text style={style.icone}>{ro.suporte && ro.suporte.colaboradorIACIT ? ro.suporte.colaboradorIACIT.id.nome.charAt(0).toUpperCase() : "N"} 
                   </Text>
                </View>
                <View style={style.container_nome} >
                  <Text style={ro.suporte ? style.nome : style.nome_naodefido}>{ro.suporte && ro.suporte.colaboradorIACIT ? ro.suporte.colaboradorIACIT.id.nome : "Colaborador não está defido"} </Text>
                  <Text style={ro.suporte ? style.preto : style.branco}>{ro.tituloOcorrencia}</Text>
                </View>
                </View>
                <View style={style.bar}/>
                </TouchableOpacity>
              )) :
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
          ) }
          </ScrollView>
            </View>
      <View style={{position:'absolute',  bottom: 0,}}>
        <Menu/>
      </View>
      </View>
  );
}

export default Contatos;